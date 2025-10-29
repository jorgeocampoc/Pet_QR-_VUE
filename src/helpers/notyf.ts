import { Notyf } from 'notyf'

const notyf = new Notyf({
  duration: 6000,
  position: { x: 'right', y: 'top' },
  types: [
    {
      type: 'success-custom',
      background:'#076b1dff',
      icon: {
        className: 'material-icons',
        text: 'check_circle',
      },
      dismissible: false,
    },
    {
      type: 'error-custom',
      background: '#FF1744',
      icon: {
        className: 'material-icons',
        text: 'error',
      },
      dismissible: false,
    },
  ],
})

export function notifySuccess(message: string, duration = 6000) {
  notyf.open({
    type: 'success-custom',
    message,
    duration,
  })
}

export function notifyError(message: string, duration = 6000) {
  notyf.open({
    type: 'error-custom',
    message,
    duration,
  })
}

export { notyf }
