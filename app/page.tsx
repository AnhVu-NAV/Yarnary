import { FullpageContainer, FullpageSection } from "@/components/Fullpage"
import { Footer } from "@/components/footer"
import { LandingHero, LandingShowcase, LandingFeatures, LandingCTA } from "@/components/landing-sections"

export default function HomePage() {
  return (
    <FullpageContainer>
      <FullpageSection id="hero"><LandingHero /></FullpageSection>
      <FullpageSection id="showcase"><LandingShowcase /></FullpageSection>
      <FullpageSection id="features"><LandingFeatures /></FullpageSection>
      {/* Footer là frame cuối để vẫn snap đẹp */}
      <FullpageSection id="footer"><Footer /></FullpageSection>
    </FullpageContainer>
  )
}
