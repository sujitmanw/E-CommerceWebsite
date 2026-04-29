console.clear();

let id = location.search.split('?')[1];
console.log(id);

// ✅ Safe badge update - wait for header to load
function updateBadge() {
  const badge = document.getElementById("badge");
  if (badge && document.cookie.indexOf(',counter=') >= 0) {
    let counter = document.cookie.split(',')[1].split('=')[1];
    badge.innerHTML = counter;
  }
}

// Wait for header fetch to complete
setTimeout(updateBadge, 600);

function dynamicContentDetails(ob) {
  let mainContainer = document.createElement('div');
  mainContainer.id = 'containerD';
  document.getElementById('containerProduct').appendChild(mainContainer);

  let imageSectionDiv = document.createElement('div');
  imageSectionDiv.id = 'imageSection';

  let imgTag = document.createElement('img');
  imgTag.id = 'imgDetails';
  imgTag.src = ob.preview;
  imageSectionDiv.appendChild(imgTag);

  let productDetailsDiv = document.createElement('div');
  productDetailsDiv.id = 'productDetails';

  let h1 = document.createElement('h1');
  h1.appendChild(document.createTextNode(ob.name));

  let h4 = document.createElement('h4');
  h4.appendChild(document.createTextNode(ob.brand));

  let detailsDiv = document.createElement('div');
  detailsDiv.id = 'details';

  let h3Price = document.createElement('h3');
  h3Price.appendChild(document.createTextNode('Rs ' + ob.price));

  let h3Desc = document.createElement('h3');
  h3Desc.appendChild(document.createTextNode('Description'));

  let para = document.createElement('p');
  para.appendChild(document.createTextNode(ob.description));

  let productPreviewDiv = document.createElement('div');
  productPreviewDiv.id = 'productPreview';

  let h3Preview = document.createElement('h3');
  h3Preview.appendChild(document.createTextNode('Product Preview'));
  productPreviewDiv.appendChild(h3Preview);

  for (let i = 0; i < ob.photos.length; i++) {
    let previewImg = document.createElement('img');
    previewImg.id = 'previewImg';
    previewImg.src = ob.photos[i];
    previewImg.onclick = function() {
      document.getElementById("imgDetails").src = this.src;
    };
    productPreviewDiv.appendChild(previewImg);
  }

  let buttonDiv = document.createElement('div');
  buttonDiv.id = 'button';

  let buttonTag = document.createElement('button');
  let buttonText = document.createTextNode('Add to Cart');

  buttonTag.onclick = function() {
    let order = id + " ";
    let counter = 1;
    if (document.cookie.indexOf(',counter=') >= 0) {
      order = id + " " + document.cookie.split(',')[0].split('=')[1];
      counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1;
    }
    document.cookie = "orderId=" + order + ",counter=" + counter;
    const badge = document.getElementById("badge");
    if (badge) badge.innerHTML = counter;
    console.log(document.cookie);
  };

  buttonTag.appendChild(buttonText);
  buttonDiv.appendChild(buttonTag);

  mainContainer.appendChild(imageSectionDiv);
  mainContainer.appendChild(productDetailsDiv);
  productDetailsDiv.appendChild(h1);
  productDetailsDiv.appendChild(h4);
  productDetailsDiv.appendChild(detailsDiv);
  detailsDiv.appendChild(h3Price);
  detailsDiv.appendChild(h3Desc);
  detailsDiv.appendChild(para);
  productDetailsDiv.appendChild(productPreviewDiv);
  productDetailsDiv.appendChild(buttonDiv);

  return mainContainer;
}

// BACKEND CALL
let httpRequest = new XMLHttpRequest
