document.addEventListener('DOMContentLoaded', () => {
    const updateTotalAmount = () => {
      let netTotal = 0;
      let totalProductCount = 0;
  
      // Loop through each product
      document.querySelectorAll('[data-product-id]').forEach((product, index) => {
        const countElement = document.getElementById(`productCount-${index}`);
        const priceElement = document.getElementById(`price-${index}`);
        const totalPriceElement = document.getElementById(`total-price-${index}`);
  
        if (countElement && priceElement && totalPriceElement) {
          const productCount = parseInt(countElement.textContent) || 0;
          const productDiscount = parseFloat(priceElement.value) || 0;
          const platformFee = 20; // Fixed platform fee
  
          const totalCost = (productDiscount * productCount) + platformFee;
          totalPriceElement.textContent = `₹ ${totalCost.toFixed(2)}`;
  
          // Update net total and product count
          netTotal += totalCost;
          totalProductCount += productCount;
        }
      });
  
      // Update the net total and product count in the DOM
      document.getElementById('net-total').textContent = `Net Total: ₹ ${netTotal.toFixed(2)}`;
      document.getElementById('product-count').textContent = `Total products: ${totalProductCount}`;
  
      // Update hidden input for form submission
      document.getElementById('order-amount').value = netTotal.toFixed(2);
    };
  
    // Add event listeners to increase and decrease buttons
    document.querySelectorAll('[id^="add-"]').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.id.split('-')[1];
        const countElement = document.getElementById(`productCount-${index}`);
        if (countElement) {
          countElement.textContent = parseInt(countElement.textContent) + 1;
          updateTotalAmount();
        }
      });
    });
  
    document.querySelectorAll('[id^="sub-"]').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.id.split('-')[1];
        const countElement = document.getElementById(`productCount-${index}`);
        if (countElement && parseInt(countElement.textContent) > 1) {
          countElement.textContent = parseInt(countElement.textContent) - 1;
          updateTotalAmount();
        }
      });
    });
  
    // Initial update
    updateTotalAmount();
  });
  