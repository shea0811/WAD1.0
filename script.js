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
    productInfoSection.innerHTML = ''; 

    for (var i = 0; i < products.length; i++) {
        let productCodeAttribute = products[i].getAttribute("code");
        if (productCodeAttribute === productCode) {
            let nameElement = products[i].getElementsByTagName("name")[0];
            let quantityElement = products[i].getElementsByTagName("quantity")[0];
            let priceElement = products[i].getElementsByTagName("price")[0];

            if (nameElement && quantityElement && priceElement) {
                var name = nameElement.childNodes[0].nodeValue;
                var quantity = quantityElement.childNodes[0].nodeValue;
                var price = priceElement.childNodes[0].nodeValue;

                htmlContent = `<div class="product">
                                   <h2>${name}</h2>
                                   <p>Quantity: ${quantity}</p>
                                   <p>Price: ${price}</p>
                               </div>`;
                break;
            }
        }
    }

    productInfoSection.innerHTML = htmlContent;
}

