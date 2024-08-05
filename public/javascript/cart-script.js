document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('[id^="add-"], [id^="sub-"]');
    const netTotalElement = document.getElementById('net-total');
    const productCountElement = document.getElementById('product-count');
    const totalProducts = products.length / 2; // Since each product has both add and sub buttons

    let grandTotal = 0;

    // Function to update the grand total
    const updateGrandTotal = () => {
        grandTotal = 0;
        for (let i = 0; i < totalProducts; i++) {
            let productCount = parseInt(document.getElementById(`productCount-${i}`).innerHTML) || 0;
            let productCost = parseFloat(document.getElementById(`price-${i}`).value) || 0;
            grandTotal += (productCost * productCount); // Add platform fee for each product
        }
        grandTotal+=20
        netTotalElement.innerHTML = `Net Total: ₹ ${grandTotal.toFixed(2)}`;
    };

    products.forEach(product => {
        let index = product.id.split('-')[1];
        let productCount = parseInt(document.getElementById(`productCount-${index}`).innerHTML) || 1;

        // Event listeners for add and subtract buttons
        document.getElementById(`add-${index}`).addEventListener('click', () => {
            productCount++;
            document.getElementById(`productCount-${index}`).innerHTML = productCount;
            calculatePrice(index, productCount);
        });

        document.getElementById(`sub-${index}`).addEventListener('click', () => {
            if (productCount > 0) {
                productCount--;
                document.getElementById(`productCount-${index}`).innerHTML = productCount;
                calculatePrice(index, productCount);
            }
        });

        // Function to calculate price for each product
        const calculatePrice = (index, productCount) => {
            let productCost = parseFloat(document.getElementById(`price-${index}`).value) || 0;
            let totalCost = (productCost * productCount) + 20; // Add platform fee for each product
            if(!productCount){
                totalCost =0;
            }
            document.getElementById(`total-price-${index}`).innerHTML = `₹ ${totalCost.toFixed(2)}`;
            updateGrandTotal();
        };

        // Initialize total cost for each product
        calculatePrice(index, productCount);
    });

    // Initial call to update grand total on page load
    updateGrandTotal();
});
