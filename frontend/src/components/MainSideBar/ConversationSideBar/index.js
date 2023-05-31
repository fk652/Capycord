import './ConversationSideBar.css';

const ConversationSideBar = () => {
  return (
    <div className="conversation-container">
      <div className="search-bar">
        <input
          className="search-bar-input disabled"
          disabled 
          type="text"
          placeholder="Find or start a conversation" 
        />
      </div>
      <div className="conversation-list">
        <div className="divider" />
        <div>
          <h2>
            <strong>Direct Messaging not implemented yet</strong>
          </h2>
          <br />
          <h2>10 FACTS ABOUT CAPYBARAS: THE WORLD’S LARGEST RODENTS</h2>
          <br />
          <p>
            Capybaras are curious animals. While they don’t look like your run-of-the-mill street or kitchen cupboard-dweller, these South American natives are the largest rodents in the world. Bizarre-looking as they may be, Capybaras have quickly become the pseudo-stars of the Internet—largely due to the fact that they look like overgrown guinea pigs—but also because of their predisposition to mix comfortably with other animals.
            Four Capybaras (Jerry, Elaine and George) are among the newest residents to settle into Currumbin Wildlife Sanctuary’s ‘Lost Valley’— and visitors can’t get enough of these guys. Here are 10 facts you may or may not have known about Capybaras:
          </p>
          <br />
          <ol>
            <li>
              1. THEY EVEN BEHAVE LIKE OTHER RODENTS
              <p>
                Belonging to the cavy family (Caviidae), their closest relatives are actually guinea pigs and rock cavies They’re essentially the rodent version of the hippopotamus—gnawing their food whilst swimming in the South American swamps. On a slightly grosser note, these guys eat their own dung to extract maximum nutrition from their food—much like rabbits. Don’t try that at home, folks!
              </p>
            </li>
            <br />
            <li>
              2. CAPYBARAS ARE FANTASTIC SWIMMERS
              <p>
                Capybaras can always be found living near bodies of water due to their semi-aquatic lifestyle. Along the banks of the Amazon River, these murky waters harbour many threats for a Capybara, but life by the water is still the perfect spot to set up camp—allowing them to retreat quickly and escape from predators like anacondas, wild cats and even eagles.
                Webbed feet help them to maneuver in water, and their facial features are located towards the top of their large heads to help them see and breathe while they swim. Pretty neat, huh?!
              </p>
            </li>
            <br />
            <li>
              3. THEY CAN EVEN SLEEP IN WATER
              <p>
                Capybaras can dive and stay underwater for up to 5 minutes at a time—often falling asleep in the water whilst keeping their nose at the edge of the banks. Napping along rivers, mangroves and marshes helps them to stay cool Who could blame them in the hot Amazonian sun?
              </p>
            </li>
            <br />
            <li>
              4. BUT THEY’RE ALSO EXTREMELY AGILE ON LAND
              <p>
                While Capybaras feel at home by the water’s edge, they certainly know their way around the land, and are capable of reaching speeds of up to 35 kilometers an hour—that’s as fast as a horse!
              </p>
            </li>
            <br />
            <li>
              5. THEY HAVE A UNIQUE VOCAL REPERTOIRE 
              <p>
                Capybaras are rather vocal animals. They like to express themselves by purring, barking, cackling, whistling, squealing, whining, grunting and even teeth-chattering—depending on what they’re trying to communicate. Not only are there harmonic differences among social groups, but each sound a Capybara makes bears a significant meaning Alerts from group members can be environmental cues, including as danger from predators and isolation of their young.
              </p>
            </li>
            <br />
            <li>
              6. THEIR TEETH GROW CONTINUOUSLY
              <p>
                To make up for the constant wear and tear of eating tough aquatic plants and grasses—their pearly whites will just keep on growing! Like rabbits, their high-crowned, narrow-edge teeth are perfectly adapted for cutting up their food
              </p>
            </li>
            <br />
            <li>
              7. OTHER ANIMALS USE CAPYBARAS LIKE FURNITURE
              <p>
                Often referred to as “nature’s ottoman” or “moving chairs”, these friendly critters don’t ever seem to knock back a ride sharing request from another animal. A whole host of bird species, monkeys, rabbits, and even other Capybaras have been spotted seated, perched or laying on the back of a much-obliging Capybara.
              </p>
            </li>
            <br />
            <li>
              8. THEY’RE HIGHLY SOCIAL ANIMALS
              <p>
                he gregarious Capybara prefers to live among large herds of around 10-20, and is frequently seen mixing with other animals These instances are often displays of a symbiotic relationship, whereby an animal, such as a bird, can enjoy a free smorgasbord of insects, while the Capybara sits back and enjoys their free grooming session. Their incredibly social nature also helps protect them from predators and improve their chances of mating.
              </p>
            </li>
            <br />
            <li>
              9. AN ADULT CAPYBARA WEIGHS AS MUCH AS AN ADULT HUMAN
              <p>
                With an average weight of around 50 kilograms, these barrel-shaped mammals are certainly no field mice—weighing anywhere between 35 and 70 kilograms. Although female Capybaras are a little heavier than their male counterparts
              </p>
            </li>
            <br />
            <li>
              10. CAPYBARAS ARE HERBIVORES
              <p>
                These voluptuous vegetarians eat a diet of aquatic plants, grasses, barks, tubers, and sugar cane. And although they’re able to eat their greens in just a short week of being born, they drink milk for the first 16 week of their lives—suckling indiscriminately from any of the mothers in the group
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default ConversationSideBar;