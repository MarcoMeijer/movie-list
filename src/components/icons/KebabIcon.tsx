import * as React from "react"
import { SVGProps } from "react"

export default function KebabIcon(props: SVGProps<SVGSVGElement>) {
  return <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>{"Kebab-Menu"}</title>
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        d="M12 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        stroke={props.fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray="0,0"
      />
    </g>
  </svg>
}

