import _sodium from "libsodium-wrappers-sumo";
import protobuf from "protobufjs";
import qr from "./protobuf/qr";

const rootQr = protobuf.Root.fromJSON(qr);
const SwissCovidLocationData = rootQr.lookupType("qrpackage.SwissCovidLocationData");
const TraceLocation = rootQr.lookupType("qrpackage.TraceLocation");
const CrowdNotifierData = rootQr.lookupType("qrpackage.CrowdNotifierData");
const QRCodePayload = rootQr.lookupType("qrpackage.QRCodePayload");

const QR_CODE_VERSION = 4;
const SWISSCOVID_LOCATION_DATA_VERSION = 4;
const ONE_MINUTE_IN_MILLIS = 60 * 1000;
const ONE_HOUR_IN_MILLIS = 60 * ONE_MINUTE_IN_MILLIS;
const AUTOMATIC_CHECKOUT_DELAY_MS = 12 * ONE_HOUR_IN_MILLIS;
const CHECKOUT_WARNING_DELAY_MS = 8 * ONE_HOUR_IN_MILLIS;
const REMINDER_DELAY_OPTIONS_MS = [30 * ONE_MINUTE_IN_MILLIS, 60 * ONE_MINUTE_IN_MILLIS, 120 * ONE_MINUTE_IN_MILLIS];
const QR_CODE_VALIDITY_DURATION_MS = 100000 * 24 * ONE_HOUR_IN_MILLIS // 100'000 days

const CRYPTOGRAPHIC_SEED_BYTES = 32;



const  generateProtoBufs = async (
    title,
    publicKeyHex
) => {
    await _sodium.ready;
    const sodium = _sodium;
    const publicKey = sodium.from_hex(publicKeyHex);

    let swissCovidLocationData = SwissCovidLocationData.create({
        version: SWISSCOVID_LOCATION_DATA_VERSION,
        automatichCheckOutDelaylMs: AUTOMATIC_CHECKOUT_DELAY_MS,
        checkoutWarningDelayMs: CHECKOUT_WARNING_DELAY_MS,
        reminderDelayOptionsMs: REMINDER_DELAY_OPTIONS_MS,
        type: "USER_QR_CODE",
    });
    const swissCovidLocationDataBytes = SwissCovidLocationData.encode(swissCovidLocationData).finish();

    let traceLocation = TraceLocation.create({
        version: QR_CODE_VERSION,
        startTimestamp: Math.floor(Date.now() / 1000),
        endTimestamp: Math.floor(Date.now() + QR_CODE_VALIDITY_DURATION_MS / 1000),
        description: title,
        address: "",
    });

    let crowdNotifierData = CrowdNotifierData.create({
        version: QR_CODE_VERSION,
        cryptographicSeed: sodium.randombytes_buf(CRYPTOGRAPHIC_SEED_BYTES),
        publicKey: publicKey,
    });

    const qrCodePayload  = QRCodePayload.create({
        version: QR_CODE_VERSION,
        crowdNotifierData: crowdNotifierData,
        locationData: traceLocation,
        countryData: swissCovidLocationDataBytes,
    });
    const qrCodePayloadBytes = QRCodePayload.encode(qrCodePayload).finish();
    return {
        qrCode: sodium.to_base64(qrCodePayloadBytes)
    };
};

export default generateProtoBufs;
