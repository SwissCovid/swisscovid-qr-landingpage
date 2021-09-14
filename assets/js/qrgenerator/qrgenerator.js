import generateProtoBufs from "./generateProtoBufs";
import generatePDF from "./generatePdf";
import printJS from 'print-js';
import { isSafari } from "../utils/utils";

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
    const pdfBytes = await generatePDF(qrCode, data);
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    
    const pdfBuffon = document.getElementById("download-pdf-btn");
    pdfBuffon.href = window.URL.createObjectURL(blob);
    pdfBuffon.download = `${data.title}.pdf`
    
    const printBuffon = document.getElementById("print-pdf-btn");
    printBuffon.onclick = () => {
        if (isSafari()) { 
            window.open(URL.createObjectURL(blob));
        } else {
            printJS(window.URL.createObjectURL(blob))
        }
    };
    
    const toggleSteps = () => {
        document.getElementById("step-1").classList.toggle('hidden');
        document.getElementById("step-2").classList.toggle('hidden');
    }

    const resetBuffon = document.getElementById("reset-btn");
    resetBuffon.onclick = () => {
        document.getElementById("title").value = '';
        document.getElementById('generate-qr-btn').disabled = true;
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
