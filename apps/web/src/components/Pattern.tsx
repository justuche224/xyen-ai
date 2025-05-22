import styled from "styled-components"
import { useTheme } from "@/components/theme-provider"

const Pattern = () => {
  const { theme } = useTheme()
  const isLightMode = theme === "light"

  return (
    <StyledWrapper $isLightMode={isLightMode}>
      <div className="futuristic-pattern">
        <span className="ripple-overlay" />
        <svg className="texture-filter">
          <filter id="advanced-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves={3} result="noise" />
            <feSpecularLighting
              in="noise"
              surfaceScale={2}
              specularConstant="0.8"
              specularExponent={20}
              lightingColor="#fff"
              result="specular"
            >
              <fePointLight x={50} y={50} z={100} />
            </feSpecularLighting>
            <feComposite in="specular" in2="SourceGraphic" operator="in" result="litNoise" />
            <feBlend in="SourceGraphic" in2="litNoise" mode="overlay" />
          </filter>
        </svg>
      </div>
    </StyledWrapper>
  )
}

interface StyledWrapperProps {
  $isLightMode: boolean
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;

  .futuristic-pattern {
    width: 100%;
    height: 100%;
    background: ${({ $isLightMode }) =>
      $isLightMode
        ? `linear-gradient(
            145deg,
            rgba(169, 140, 76, 0.95),
            rgba(108, 149, 214, 0.95),
            rgba(124, 43, 117, 0.95)
          )`
        : `linear-gradient(
            145deg,
            rgb(0, 0, 0),
            rgba(35, 35, 35, 0.9),
            rgb(50, 50, 50)
          )`};
    filter: url(#advanced-texture);
  }
`

export default Pattern
