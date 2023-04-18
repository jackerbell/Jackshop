const deleteProductButtonElements = document.querySelectorAll('.product-item button.delete');

const deleteProduct = async (event) => {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;
  const csrfToken = buttonElement.dataset.csrf;

  const response = await fetch('/admin/products/'+productId+'?_csrf='+csrfToken,{ // 서버에 추가한 CSRF보호는 일부 양식이 제출되어
    method: 'DELETE'                                  // 전송된 요청 뿐 아니라, 클라이언트로 전송하는 요청에도 영향을 미치므로 CSRF 토큰을 추가해줘야한다.          
  });
  console.log(`'/admin/products/' ${productId}`);

  if(!response.ok){
    alert('Something went wrong!');
    return;
  }

  buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for(const deleteProductButtonElement of deleteProductButtonElements){
  deleteProductButtonElement.addEventListener('click',deleteProduct);
}