import './lit_parent_element.js'

const mountDemo = () => {
  if (document.querySelector('react-mode-demo')) return
  const demo = document.createElement('react-mode-demo')
  document.body.appendChild(demo)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountDemo)
} else {
  mountDemo()
}
