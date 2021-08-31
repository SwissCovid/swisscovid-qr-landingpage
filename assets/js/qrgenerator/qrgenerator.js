import strftime from "strftime";
import generateProtoBufs from "./generateProtoBufs";
import { generateSvg } from "./generateQrCode";
import generatePDF from "./generatePdf";
import printJS from 'print-js';

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
    const pdfBytes = await generatePDF(qrCode, data);
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    
    const pdfBuffon = document.getElementById("download-pdf-btn");
    pdfBuffon.href = window.URL.createObjectURL(blob);
    pdfBuffon.download = "file.pdf"
    
    const printBuffon = document.getElementById("print-pdf-btn");
    printBuffon.onclick = () => {
        printJS(window.URL.createObjectURL(blob))
    };
    
    const toggleSteps = () => {
        document.getElementById("step-1").classList.toggle('hidden');
        document.getElementById("step-2").classList.toggle('hidden');
    }

    const resetBuffon = document.getElementById("reset-btn");
    resetBuffon.onclick = () => {
        document.getElementById("title").value = '';
        toggleSteps();
    };
    toggleSteps();
};

export const initializeQrGenerator = () => {
    console.log("Init QR-Generator")
    const qrButton = document.getElementById("generate-qr-btn");
    qrButton.onclick = () => {
        generateQRCode(qrButton);
    };

    const inputField = document.getElementById("title");
    inputField.oninput = () => {
        const generateButton = document.getElementById('generate-qr-btn');
        generateButton.disabled = inputField.value.length === 0 && inputField.value.length <= 100;
    }
};
