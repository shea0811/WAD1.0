window.onload = function() {
    var urlParams = new URLSearchParams(window.location.search);
    var productCode = urlParams.get('code');
    loadProductDetails(productCode);
};

function loadProductDetails(productCode) {
    var parser = new DOMParser();
    var xmlDoc;

    // Load and parse the XML file
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            xmlDoc = parser.parseFromString(this.responseText, "text/xml");
            displayProductInfo(xmlDoc, productCode);
        }
    };
    xhr.open("GET", "https://raw.githubusercontent.com/shea0811/WAD1.0/main/WADCA1.xml", true);
    xhr.send();
}

function displayProductInfo(xml, productCode) {
    var products = xml.getElementsByTagName("product");
    var productInfoSection = document.getElementById('productInfo');
    let htmlContent = '';
    productInfoSection.innerHTML = ''; // Clear previous results

    for (var i = 0; i < products.length; i++) {
        if (products[i].getElementsByTagName("code")[0].childNodes[0].nodeValue === productCode) {
            var name = products[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
            var quantity = products[i].getElementsByTagName("quantity")[0].childNodes[0].nodeValue;
            var price = products[i].getElementsByTagName("price")[0].childNodes[0].nodeValue;
            
            products.forEach(product => {
                htmlContent += `<div class="product">
                                    <h2>${product.name}</h2>
                                    <p>${product.description}</p>
                                    
                                </div>`;
            });
            
            productInfoSection.innerHTML = htmlContent;
    }
}
}

