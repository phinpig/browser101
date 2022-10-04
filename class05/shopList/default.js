const shopList = document.querySelector('.list');
const shopForm = document.querySelector('.shop-form');
const newInput = document.querySelector('.new-input');
shopForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (newInput.value !== '') {
    addShop(newInput.value);
    shopList.scrollIntoView({ block: 'end' });
  }
  newInput.value = '';
  newInput.focus();
  //return; 포커스 자리에 감
});

let id = 0;
function addShop(item) {
  const li = document.createElement('li');
  li.setAttribute('data-id', id);
  li.innerHTML = `            
          <span class="item">${item}</span>
          <button type="button" data-id="${id}" class="btn-del"><span>삭제</span></button>            
  `;
  id++;
  shopList.append(li);
}
shopList.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  if (id) {
    const idDel = document.querySelector(`li[data-id="${id}"]`);
    idDel.remove();
  }
});
// shopList.addEventListener('click', (e) => {
//
//     const noYes = confirm(`저장하신 ${item}를(을) 목록에서 지울것에요?`);
//     if (noYes) {
//       e.target.parentElement.remove();
//     }
//
// });
