
// import styles from './button.module.scss'

const Button = ({ children, ...props  }) => {

  return (
    <button type='button' {...props}>{children}</button>
  )
}

export default Button