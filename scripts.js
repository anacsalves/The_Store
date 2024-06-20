document.addEventListener('DOMContentLoaded', () => {
    // Gerenciamento de Usuários
    const userForm = document.getElementById('userForm');
    const userTable = document.getElementById('userTable').querySelector('tbody');

    let users = [];
    let editUserIndex = null;

    userForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const name = userForm.name.value;
        const cpf = userForm.cpf.value;
        const rg = userForm.rg.value;
        const role = userForm.role.value;
        
        const user = { name, cpf, rg, role };

        if (editUserIndex !== null) {
            users[editUserIndex] = user;
            editUserIndex = null;
        } else {
            users.push(user);
        }

        userForm.reset();
        userForm.role.disabled = false;
        renderUsers();
    });

    function renderUsers() {
        userTable.innerHTML = '';
        users.forEach((user, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.cpf}</td>
                <td>${user.rg}</td>
                <td>${user.role}</td>
                <td class="actions">
                    <button class="edit" onclick="editUser(${index})">✏️</button>
                    <button class="delete" onclick="deleteUser(${index})">🗑️</button>
                </td>
            `;
            
            userTable.appendChild(row);
        });
    }

    window.editUser = function(index) {
        const user = users[index];
        userForm.name.value = user.name;
        userForm.cpf.value = user.cpf;
        userForm.rg.value = user.rg;
        userForm.role.value = user.role;
        userForm.role.disabled = true;
        editUserIndex = index;
    };

    window.deleteUser = function(index) {
        users.splice(index, 1);
        renderUsers();
    };

    const productForm = document.getElementById('productForm');
    const productTable = document.getElementById('productTable').querySelector('tbody');
    let products = [];
    let editProductIndex = null;

    productForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const code = productForm.code.value;
        const description = productForm.description.value;
        const purchasePrice = parseFloat(productForm.purchasePrice.value);
        const salePrice = parseFloat(productForm.salePrice.value);
        const quantity = parseInt(productForm.quantity.value);

        if (editProductIndex !== null) {
            products[editProductIndex].purchasePrice = purchasePrice;
            products[editProductIndex].salePrice = salePrice;
            products[editProductIndex].quantity = quantity; // Corrigido para permitir edição da quantidade
            editProductIndex = null;
        } else {
            const existingProductIndex = products.findIndex(product => product.code === code);
            if (existingProductIndex !== -1) {
                products[existingProductIndex].quantity += quantity;
            } else {
                const product = { code, description, purchasePrice, salePrice, quantity };
                products.push(product);
            }
        }

        productForm.reset();
        productForm.code.disabled = false;
        productForm.description.disabled = false;
        productForm.quantity.disabled = false;
        renderProducts();
    });

    function renderProducts() {
        productTable.innerHTML = '';
        products.forEach((product, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${product.code}</td>
                <td>${product.description}</td>
                <td>${product.purchasePrice.toFixed(2)}</td>
                <td>${product.salePrice.toFixed(2)}</td>
                <td>${product.quantity}</td>
                <td class="actions">
                    <button class="edit" onclick="editProduct(${index})">✏️</button>
                    <button class="delete" onclick="deleteProduct(${index})">🗑️</button>
                </td>
            `;

            productTable.appendChild(row);
        });
    }

    window.editProduct = function(index) {
        const product = products[index];
        productForm.code.value = product.code;
        productForm.description.value = product.description;
        productForm.purchasePrice.value = product.purchasePrice;
        productForm.salePrice.value = product.salePrice;
        productForm.quantity.value = product.quantity;

        productForm.code.disabled = true;
        productForm.description.disabled = true;
        productForm.quantity.disabled = true;
        editProductIndex = index;
    };

    window.deleteProduct = function(index) {
        products.splice(index, 1);
        renderProducts();
    };
    // Gerenciamento de Clientes
    const clientForm = document.getElementById('clientForm');
    const clientTable = document.getElementById('clientTable').querySelector('tbody');

    let clients = [];
    let editClientIndex = null;

    clientForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const clientName = clientForm.clientName.value;
        const clientCPF = clientForm.clientCPF.value;
        const clientAddress = clientForm.clientAddress.value;
        const clientEmail = clientForm.clientEmail.value;

        const client = { clientName, clientCPF, clientAddress, clientEmail };

        if (editClientIndex !== null) {
            clients[editClientIndex].clientAddress = clientAddress;
            clients[editClientIndex].clientEmail = clientEmail;
            editClientIndex = null;
        } else {
            clients.push(client);
        }

        clientForm.reset();
        renderClients();
    });

    function renderClients() {
        clientTable.innerHTML = '';
        clients.forEach((client, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${client.clientName}</td>
                <td>${client.clientCPF}</td>
                <td>${client.clientAddress}</td>
                <td>${client.clientEmail}</td>
                <td class="actions">
                    <button class="edit" onclick="editClient(${index})">✏️</button>
                    <button class="delete" onclick="deleteClient(${index})">🗑️</button>
                </td>
            `;

            clientTable.appendChild(row);
        });
    }

    window.editClient = function(index) {
        const client = clients[index];
        clientForm.clientName.value = client.clientName;
        clientForm.clientCPF.value = client.clientCPF;
        clientForm.clientAddress.value = client.clientAddress;
        clientForm.clientEmail.value = client.clientEmail;
        editClientIndex = index;

        // Habilitar apenas os campos de endereço e email para edição
        clientForm.clientName.disabled = true;
        clientForm.clientCPF.disabled = true;
    };

    window.deleteClient = function(index) {
        clients.splice(index, 1);
        renderClients();
    };
     // Emissão de Nota Fiscal
     const invoiceForm = document.getElementById('invoiceForm');
     const invoiceTable = document.getElementById('invoiceTable').querySelector('tbody');
     let invoices = [];

     invoiceForm.addEventListener('submit', (event) => {
         event.preventDefault();

         const invoiceCPF = invoiceForm.invoiceCPF.value;
         const invoiceCode = (invoiceForm.invoiceCode.value);
         const invoiceQuantity = (invoiceForm.invoiceQuantity.value);
         const invoiceDate = invoiceForm.invoiceDate.value;

         const product = products.find(p => p.code === invoiceCode);
         if (!product || product.quantity < invoiceQuantity) {
             alert('Produto inexistente ou quantidade insuficiente!');
             return;
         }

         const totalValue = invoiceQuantity * product.salePrice;

         const invoice = { invoiceCPF, invoiceCode, invoiceQuantity, invoiceDate, totalValue };
         invoices.push(invoice);
         renderInvoices();
         product.quantity -= invoiceQuantity; // Atualiza o estoque
         renderProducts(); // Atualiza a lista de produtos
     });

     function renderInvoices() {
         invoiceTable.innerHTML = '';
         invoices.forEach(invoice => {
             const row = document.createElement('tr');
             row.innerHTML = `
                 <td>${invoice.invoiceCPF}</td>
                 <td>${invoice.invoiceCode}</td>
                 <td>${invoice.invoiceQuantity}</td>
                 <td>${invoice.invoiceDate}</td>
                 <td>${invoice.totalValue.toFixed(2)}</td>
             `;
             invoiceTable.appendChild(row);
         });
     }

    function renderInvoices() {
        invoiceTable.innerHTML = '';
        invoices.forEach(invoice => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${invoice.invoiceCPF}</td>
                <td>${invoice.invoiceCode}</td>
                <td>${invoice.invoiceQuantity}</td>
                <td>${invoice.invoiceDate}</td>
                <td>${invoice.totalValue.toFixed(2)}</td>
            `;
            invoiceTable.appendChild(row);
        });
    }

    // Relatórios
    const reportForm = document.getElementById('reportForm');
    const faturamentoReport = document.getElementById('faturamentoReport');
    const lucroReport = document.getElementById('lucroReport');

    reportForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const startDate = new Date(reportForm.reportStartDate.value);
        const endDate = new Date(reportForm.reportEndDate.value);

        if (startDate > endDate) {
            alert('A data inicial não pode ser maior que a data final!');
            return;
        }

        generateReports(startDate, endDate);
    });

    function generateReports(startDate, endDate) {
        let totalFaturamento = 0;
        let totalLucro = 0;

        invoices.forEach(invoice => {
            const invoiceDate = new Date(invoice.invoiceDate);
            if (invoiceDate >= startDate && invoiceDate <= endDate) {
                totalFaturamento += invoice.totalValue;
                const product = products.find(p => p.code === invoice.invoiceCode);
                if (product) {
                    const lucro = (invoice.invoiceQuantity * (product.salePrice - product.purchasePrice));
                    totalLucro += lucro;
                }
            }
        });

        faturamentoReport.innerHTML = `Total de Faturamento: R$ ${totalFaturamento.toFixed(2)}`;
        lucroReport.innerHTML = `Total de Lucro: R$ ${totalLucro.toFixed(2)}`;
    }

    // Inicialização da página com dados existentes (caso existam)
    renderUsers();
    renderProducts();
    renderClients();
    renderInvoices();
});
