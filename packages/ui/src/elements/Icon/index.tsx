import { ComponentProps, FC } from 'react'
import styles from './index.module.css'

type ArrowSvgProps = ComponentProps<'svg'>

export const HeartFilledIcon: FC<ArrowSvgProps> = (props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentcolor"
      {...props}
    >
      <path d="M7.99961 13.8667C7.88761 13.8667 7.77561 13.8315 7.68121 13.7611C7.43321 13.5766 1.59961 9.1963 1.59961 5.8667C1.59961 3.80856 3.27481 2.13336 5.33294 2.13336C6.59054 2.13336 7.49934 2.81176 7.99961 3.3131C8.49988 2.81176 9.40868 2.13336 10.6663 2.13336C12.7244 2.13336 14.3996 3.80803 14.3996 5.8667C14.3996 9.1963 8.56601 13.5766 8.31801 13.7616C8.22361 13.8315 8.11161 13.8667 7.99961 13.8667Z" />
    </svg>
  )
}

export const HeartOutlineIcon: FC<ArrowSvgProps> = (props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentcolor"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.99961 4.8232L7.24456 4.06654C6.84123 3.66235 6.18866 3.20003 5.33294 3.20003C3.86391 3.20003 2.66628 4.39767 2.66628 5.8667C2.66628 6.4079 2.91276 7.1023 3.41967 7.91383C3.91548 8.70759 4.59649 9.51244 5.31278 10.2503C6.38267 11.3525 7.47318 12.2465 7.99983 12.6605C8.52734 12.2456 9.61718 11.352 10.6864 10.2504C11.4027 9.51248 12.0837 8.70762 12.5796 7.91384C13.0865 7.1023 13.3329 6.4079 13.3329 5.8667C13.3329 4.39723 12.1354 3.20003 10.6663 3.20003C9.81056 3.20003 9.15799 3.66235 8.75466 4.06654L7.99961 4.8232ZM7.98574 3.29926C7.48264 2.79938 6.57901 2.13336 5.33294 2.13336C3.27481 2.13336 1.59961 3.80856 1.59961 5.8667C1.59961 9.1963 7.43321 13.5766 7.68121 13.7611C7.77561 13.8315 7.88761 13.8667 7.99961 13.8667C8.11161 13.8667 8.22361 13.8315 8.31801 13.7616C8.56601 13.5766 14.3996 9.1963 14.3996 5.8667C14.3996 3.80803 12.7244 2.13336 10.6663 2.13336C9.42013 2.13336 8.51645 2.79947 8.01337 3.29936C8.00877 3.30393 8.00421 3.30849 7.99967 3.31303C7.99965 3.31305 7.99963 3.31307 7.99961 3.3131C7.99502 3.3085 7.9904 3.30389 7.98574 3.29926Z"
      />
    </svg>
  )
}

export const DotsIcon: FC<ArrowSvgProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </svg>
  )
}

export const ArrowSvg: FC<ArrowSvgProps> = (props) => {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className={styles[`arrow-fill`]}
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className={styles[`arrow-outer-stroke`]}
      />
    </svg>
  )
}

export const XIcon: FC<ArrowSvgProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
