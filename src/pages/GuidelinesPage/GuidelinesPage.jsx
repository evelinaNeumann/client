import "./GuidelinesPage";
import React from "react";
import listImg from "../../images/gl-list.png"
import dogRunning from "../../images/running-dog.webp"
import catGrooming from "../../images/cat-attention.png"
import bunny from "../../images/bunny.jpg"

function GuidelinesPage() {
  return (
    <div>
      <div className="bg-lime-800 bg-opacity-80 p-16">
        <h1 className="text-white text-5xl font-bold hover:text-orange-500">Guidelines for adoption</h1>
      </div>

      <div className="px-12">
        <div className="px-4 md:px-12 py-4">
          <h1 className="flex text-4xl py-4">Are you planning on adopting a Pet? This is our guide to adoption</h1>

          <div className="flex flex-col md:flex-row items-center py-4 space-between">
            <p className="text-2xl text-justify text-zinc-400 md:w-3/5 md:pr-8">
              Every furry friend deserves to feel safe, respected, and loved. That's why we're on a mission to ensure that all pets in need of a home find the perfect match.

              Before diving into the adoption process, we recommend checking if you're ready and learning how to properly care for your chosen pet.

              Because the well-being of our furry pals is our top priority, we've laid down some rules and recommendations. Some of these apply to everyone, while others depend on the type of pet you want to adopt. These guidelines not only protect our pets but also help you figure out if you're truly ready to embrace the joy of adoption.
            </p>
            <img src={listImg} alt="List for guidelines" className="w-3/5 h-auto md:w-1/4 md:w-1/3 lg:w-1/4 md:pl-8 mt-4 md:mt-0" />
          </div>
        </div>

        <div className="flex flex-col items-start px-4 md:px-12 py-4">
          <h2 className="flex text-4xl py-4">What type of pet should I have?</h2>
          <p className="text-2xl text-justify text-zinc-400 md:w-3/5 md:pr-8">Based on your daily habits and lifestyle</p>

          <div className="flex flex-col py-4">
            <h3 className="flex text-3xl py-4">Lifestyle and Activity Level</h3>
            <div className="flex flex-col md:flex-row items-center py-4 space-between">
              <ul className="text-2xl text-justify text-zinc-400">
                <li><span className="underline underline-offset-4 text-black">Dogs:</span> If you lead an active lifestyle and enjoy outdoor activities such as walking, running, or playing fetch, a dog may be a great fit. Dogs typically require daily exercise and mental stimulation.</li>
                <li><span className="underline underline-offset-4 text-black">Cats:</span> If you prefer a more independent and low-maintenance companion, a cat might be the right choice. Cats are generally more self-sufficient and require less exercise compared to dogs.</li>
                <li><span className="underline underline-offset-4 text-black">Smaller Animals:</span> If you have limited space or prefer a pet that requires minimal exercise, smaller animals like hamsters, guinea pigs, or rabbits can be suitable options.</li>
              </ul>
              <img src={dogRunning} alt="List for guidelines" className="w-3/5 h-auto md:w-1/4 md:w-1/3 lg:w-1/4 md:pl-8 mt-4 md:mt-0" />
            </div>
          </div>
<hr></hr>
          <div className="flex flex-col py-4">
            <h3 className="flex text-3xl py-4">Time and Attention</h3>
            <div className="flex flex-col md:flex-row items-center py-4 space-between">
              <img src={catGrooming} alt="List for guidelines" className="w-3/5 h-auto md:w-1/4 md:w-1/3 lg:w-1/4 md:pl-8 mt-4 md:mt-0" />
              <ul className="text-2xl text-justify text-zinc-400 lg:pl-8">
                <li><span className="underline underline-offset-4 text-black">Dogs:</span> Dogs thrive on human interaction and companionship. They require regular feeding, exercise, grooming, and training. If you can dedicate time to training and socializing a dog, they can be incredibly loyal and loving companions.</li>
                <li><span className="underline underline-offset-4 text-black">Cats:</span> Cats are generally more self-sufficient and can adapt well to a more independent lifestyle. They still require feeding, playtime, and affection, but they are often more low-maintenance compared to dogs.</li>
                <li><span className="underline underline-offset-4 text-black">Smaller Animals:</span> Smaller animals usually require less time and attention compared to dogs and cats. However, they still need proper care, including regular feeding, cleaning their habitats, and providing social interaction.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col py-4">
            <h3 className="flex text-3xl py-4">Living Arrangements</h3>
            <div className="flex flex-col md:flex-row items-center py-4 space-between">
              <ul className="text-2xl text-justify text-zinc-400">
                <li><span className="underline underline-offset-4 text-black">Dogs:</span> Consider your living situation and whether you have access to outdoor space, such as a yard or nearby parks. Some dog breeds require more space and are better suited for houses with yards, while others can adapt well to apartment living.</li>
                <li><span className="underline underline-offset-4 text-black">Cats:</span> Cats are generally more adaptable to various living environments. They can thrive in apartments as long as they have enough space for play, scratching posts, and litter boxes.</li>
                <li><span className="underline underline-offset-4 text-black">Smaller Animals:</span> Smaller animals like hamsters, guinea pigs, or rabbits require appropriate enclosures or cages. Make sure you have enough space to accommodate their habitat and keep them safe.</li>
              </ul>
              <img src={bunny} alt="List for guidelines" className="w-3/5 h-auto md:w-1/4 md:w-1/3 lg:w-1/4 md:pl-8 mt-4 md:mt-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuidelinesPage;