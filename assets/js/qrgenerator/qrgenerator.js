import strftime from "strftime";
import generateProtoBufs from "./generateProtoBufs";
import { generateSvg } from "./generateQrCode";
import generatePDF from "./generatePdf";

const generateQRCode = async (qrButton) => {

    const formData = new FormData(document.getElementById("qr-form"));
    const data = {
        title: formData.get("title"),
    };

    const { qrCode } = await generateProtoBufs(
        data.title,
        `${PUBLIC_KEY}`
    );

    const qrCodeImgValue = `${BASE_URL}#${qrCode}`;
    const qrCodeImg = await generateSvg(qrCodeImgValue, {
        width: 161,
        color: { dark: "#000000" },
    });

    document.getElementById("qr-code").innerHTML = qrCodeImg;

    const pdfBytes = await generatePDF(qrCode, data);
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    
    var pdfBuffon = "<a href=\"" + window.URL.createObjectURL(blob) + "\">" + window.currentLanguage.downloadPdf + "</a>"
    document.getElementById("qr-code").insertAdjacentHTML('beforeend', pdfBuffon);
};

export const initializeQrGenerator = () => {
    console.log("Init QR-Generator")
    const qrButton = document.getElementById("generate-qr-btn");
    qrButton.onclick = () => {
        generateQRCode(qrButton);
    };
};
