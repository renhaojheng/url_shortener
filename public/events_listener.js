const copy = document.querySelector('#copy-button')
const link = document.querySelector('#link')

copy.addEventListener('click', copyLink)

function copyLink() {
  const content = link.innerText
  navigator.clipboard.writeText(content)
}

