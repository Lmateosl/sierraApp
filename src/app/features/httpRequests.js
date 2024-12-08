export const preparePayment = async (paymentData) => {
    try {
        const response = await fetch('https://pay.payphonetodoesposible.com/api/button/Prepare', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_TOKEN_PAYPHONE}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
        });

        if (!response.ok) {
            throw new Error('Error en la llamada: ' + response.statusText);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error preparing payment:', error);
        throw error;
    }
};

export const confirmPayment = async (paymentData) => {
    try {
        const response = await fetch('https://pay.payphonetodoesposible.com/api/button/V2/Confirm', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_TOKEN_PAYPHONE}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
        });

        if (!response.ok) {
            throw new Error('Error en la llamada: ' + response.statusText);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error preparing payment:', error.message);
        throw error;
    }
};


