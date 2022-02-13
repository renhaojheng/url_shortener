const copy = document.querySelector('#copy-button')
const link = document.querySelector('#link')

copy.addEventListener('click', copyLink)

function copyLink() {
  const content = link.textContent
  navigator.clipboard.writeText(content)
}

