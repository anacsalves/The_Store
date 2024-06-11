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
            users[editUserIndex].name = name;
            users[editUserIndex].cpf = cpf;
            users[editUserIndex].rg = rg;
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

    // Gerenciamento de Produtos
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
});
