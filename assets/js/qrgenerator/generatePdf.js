import { generateDataURL } from "./generateQrCode";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import strftime from "strftime";

const generatePDF = async (qrCode, data) => {
    let pdf;
    const pdfPromise = fetch(
        `/pdfs/template.${window.currentLanguage.shortcode}.pdf`
    )
        .then((response) => {
            return response.arrayBuffer();
        })
        .then((buffer) => {
            return PDFDocument.load(buffer);
        })
        .then((pdfDoc) => {
            pdf = pdfDoc;
            pdf.registerFontkit(fontkit);
        });

    const asyncInterLight = fetch(`/fonts/Inter-Light.otf`)
        .then((response) => {
            return response.arrayBuffer();
        })
        .then(async (buffer) => {
            await pdfPromise;
            return pdf.embedFont(buffer);
        });
    const asyncInterBold = fetch(`/fonts/Inter-Bold.otf`)
        .then((response) => {
            return response.arrayBuffer();
        })
        .then(async (buffer) => {
            await pdfPromise;
            return pdf.embedFont(buffer);
        });
    const asyncInterRegular = fetch(`/fonts/Inter-Regular.otf`)
        .then((response) => {
            return response.arrayBuffer();
        })
        .then(async (buffer) => {
            await pdfPromise;
            return pdf.embedFont(buffer);
        });
    const asyncQrCodePng = generateDataURL(`${BASE_URL}#${qrCode}`, {
        width: 192,
        color: { dark: "#000000" },
    }).then(async (url) => {
        await pdfPromise;
        return pdf.embedPng(url);
    });

    await pdfPromise;

    const qrCodePage = pdf.getPage(0);

    const qrCodePng = await asyncQrCodePng;
    qrCodePage.drawImage(qrCodePng, {
        x: qrCodePage.getWidth() / 2 - qrCodePng.width / 2,
        y: 379,
        width: qrCodePng.width,
        height: qrCodePng.height,
    });

    const interLight = await asyncInterLight;
    const interBold = await asyncInterBold;
    const interRegular = await asyncInterRegular;

    const publicTitleSize = 24.3;
    const publicTitleWidth = interBold.widthOfTextAtSize(
        data.title,
        publicTitleSize
    );

    qrCodePage.drawText(data.title, {
        x: qrCodePage.getWidth() / 2 - publicTitleWidth / 2,
        y: 279,
        size: publicTitleSize,
        font: interBold,
        color: rgb(0, 0, 0),
    });

    return pdf.save();
};

export default generatePDF;
