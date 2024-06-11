import Banner from "../../components/Banner"
import { Collapse } from "../../components/Collapse/Collapse"
import background from "../../assets/images/banner-about.jpg"

const collapseArray = [
  {
    id: "Collapse 1",
    label: "Fiabilité",
    content:
      "Les annonces postées sur Kasa garantissent une fiabilité totale. Les photos sont conformes aux logements, et toutes les informations sont régulièrement vérifiées  par nos équipes.",
  },
  {
    id: "Collapse 2",
    label: "Respect",
    content:
      "La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme.",
  },
  {
    id: "Collapse 3",
    label: "Service",
    content:
      "Nos équipes se tiennent à votre disposition pour vous fournir une expérience parfaite. N'hésitez pas à nous contacter si vous avez la moindre question.",
  },
  {
    id: "Collapse 4",
    label: "Sécurité",
    content:
      "La sécurité est la priorité de Kasa. Aussi bien pour nos hôtes que pour les voyageurs, chaque logement correspond aux critères de sécurité établis par nos services. En laissant une note aussi bien à l'hôte qu'au locataire, cela permet à nos équipes de vérifier que les standards sont bien respectés. Nous organisons également des ateliers sur la sécurité domestique pour nos hôtes.",
  },
]

function About() {
  return (
    <>
      <main className="main-content">
        <Banner picture={background} />
        <section className="about_collapse">
          {collapseArray.map((collapse) => (
            <Collapse
              key={collapse.id}
              id={collapse.id}
              label={collapse.label}
              content={collapse.content}
            />
          ))}
        </section>
      </main>
    </>
  )
}

export default About
