<script>
  function calculate() {
    let rows = document.querySelectorAll("#invoiceItems tr");
    let totalAmount = 0;
    let taxRate = 0.18;

    rows.forEach(row => {
      const qty = parseFloat(row.querySelector(".qty").value) || 0;
      const rate = parseFloat(row.querySelector(".rate").value) || 0;
      const amount = qty * rate;
      const inclTax = amount * (1 + taxRate);

      row.querySelector(".amount").value = amount.toFixed(2);
      row.querySelector(".inclTax").value = inclTax.toFixed(2);

      totalAmount += amount;
    });

    const cgst = totalAmount * 0.09;
    const sgst = totalAmount * 0.09;
    const roundOff = 0;
    const total = totalAmount + cgst + sgst + roundOff;

    document.getElementById('cgst').value = cgst.toFixed(2);
    document.getElementById('sgst').value = sgst.toFixed(2);
    document.getElementById('roundOff').value = roundOff.toFixed(2);
    document.getElementById('total').value = total.toFixed(2);

    document.getElementById('hsnTaxable').value = totalAmount.toFixed(2);
    document.getElementById('hsnCGST').value = cgst.toFixed(2);
    document.getElementById('hsnSGST').value = sgst.toFixed(2);
    document.getElementById('hsnTotalTax').value = (cgst + sgst).toFixed(2);
  }

  function addRow() {
    const tbody = document.getElementById("invoiceItems");
    const rowCount = tbody.rows.length;
    const newRow = tbody.rows[0].cloneNode(true);

    newRow.querySelectorAll("input").forEach(input => {
      if (input.type === "number" || input.type === "text") {
        input.value = input.classList.contains("qty") ? "1" : "";
      }
    });

    newRow.cells[0].innerText = rowCount + 1;
    tbody.appendChild(newRow);
    calculate();
  }

  function removeRow() {
    const tbody = document.getElementById("invoiceItems");
    if (tbody.rows.length > 1) {
      tbody.removeChild(tbody.lastElementChild);
      calculate();
    }
  }

  window.onload = function() {
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-GB');
    const invNo = "INV" + today.getFullYear().toString().slice(-2) +
      (today.getMonth() + 1).toString().padStart(2, '0') +
      today.getDate().toString().padStart(2, '0') +
      Math.floor(1000 + Math.random() * 9000);
    document.getElementById('invoiceDate').value = dateStr;
    document.getElementById('invoiceNo').value = invNo;
    calculate();
  }
</script>
