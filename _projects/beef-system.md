---
title: The Beef System
---
[Beef System Repo](https://github.com/emilxf-0/Portfolio/tree/main/Beef%20System)

# Beef System

- **Developed:** 2023 October - Ongoing
- **Library:** SDL2
- **Language:** C++
- **Genre:** Examination Project


<button class="prose prose-a:text-white prose-a:no-underline prose-a:font-semibold bg-zinc-900 hover:scale-105 p-2 md:p-4 my-4  font-semibold">
<a href="https://github.com/emilxf-0/Portfolio/tree/main/Beef%20System"
 target="_">Check out the full Repo</a>
</button>

### Overview
The Beef System is a spin on the Nemesis system, made famous by Shadows of Mordor. As the name implies it's not so much a game as it is a system for emergent narrative. With that said, I wanted a setting that felt thematic so it takes place in the most infuriating of places: traffic. 

NOTE! What follows is my complete Master Thesis. I'm working on a more digestible version.


### Introduction
I wanted to do two things during my master thesis:

1. Get a fundamental understanding of code by learning SDL2 and C++
2. Create a small scale, [nemesis like system](https://www.polygon.com/middle-earth-shadow-of-war-guide/2017/10/9/16439610/the-nemesis-system-and-you) 

### Part 1 Learning to code everything
To take some of the black box feeling away from game programming I've decided to forego any engines and learn C++ by using [SDL2](https://www.libsdl.org/). SDL2 (Simple DirectMedia Layer) is a development library that provides access to basic functions like keyboard input, audio and reading in images but leaves the implementation of the actual engine up to you.

#### Why SDL2 and C++?
I wanted to learn more about C++ since it's more in demand from employers, especially when working with Unreal Engine. I wanted a cleaner learning experience than trying to learn "UE C++" so I chose SDL2 as the way to learn. Also, I wanted the Beef System to be as platform agnostic as possible and using a library just made more sense. 

### Part 2 The Beef System
The Nemesis system is an extremely ambitious implementation comprising character creation and emergent storytelling, dynamically creating nemeses for the player to encounter, lose to and vanquish. While sadly lacking the resources of Warner Bros and Monolith I focused less on building a complex AI system that handles leveling and intricate events and went with attempting to leverage the character creation part to its fullest. 

#### So what is the Beef System exactly?
Dubbed from [one of the greatest mini series in recent memory](https://www.imdb.com/title/tt14403178/), the Beef System is a way to handle interactions between player and NPC's. I wanted to create something that allows NPC's to have their own will and agenda, creating an emerging narrative that not even the creator of the game can foresee. 

### Challenges

#### Scope creep

One of the challenges by going the library route is that I have to completely recreate what's usually just double clicking the unity icon. I wanted to keep things as bare bones as possible as the main focus should be creating the Beef System, but bare bones still make up a pretty complex skeleton. 

#### Complexity and memory management
Having a bunch of NPC's running around, living their own lives is resource intensive. We can't keep tabs on everything that everyone does, all our computing power would go to just maintaining peoples intricate and weird, little lives. Not to mention the whole "a tree falls in the woods" conundrum. Why process things that people never will see? 

One of the solutions to that problem was to decide to limit the system to purely handle data, but leaving connections open to other systems. You can easily jack in an AI, controllers, dialogue trees or any other game-y system that you'd like. But actually managing how to solve those interactions are out of scope for this project. 

#### Presenting a data heavy system visually
All these limitations also puts a cap on how much of an actual game I can make during the project. Explaining a system only goes so far. I've created a super simple map that I can use to print out different characters and props, but the actual logic is limited to debugs. There's no pathfinding or anything like that, just a player car a couple of npc cars that can't move, and then an awful lot of stuff happening behind the scenes. 

### Goal

I wanted to build a tool that's easy for narrative and character designers to work with, while also making something that's dynamic and smoothly integrates with the all the other systems that make a game. 

### Question

"Can I create a system that supports emergent narrative both in strongly controlled stories and in games without any prewritten narrative?"

### Result

What I ended up with is a *very* lightweight game engine that comprise of the following:

1. An Entity-Component-System framework (ECS)
2. Character creation
3. Serialization and deserialization to handle data

#### The ECS

The ECS framework allows me to create flexible and modular game entities by composing them with various components. Each component encapsulates specific functionality, and entities can dynamically add or remove components during runtime.

#### Components:

1. `Component` **class:**
    - Acts as the base class for all components.
    - Contains virtual functions (`init`, `update`, `draw`) that can be overridden by derived classes to define specific behaviors.
2. `Entity` **class:**
    - Represents a game entity, such as a character, that can have various components.
    - It keeps a collection of components (`components` vector) associated with the entity.
    - Provides functions like `update`, `draw`, `hasComponent`, `addComponent`, and `getComponent` to manage and interact with components.

#### ECS Core:

1. `Manager` **class:**
    - Manages a collection of entities (`entities` vector).
    - Provides functions like `update`, `draw`, and `refresh` to iterate through entities and update/draw them.
    - `addEntity` function creates a new entity, adds it to the `entities` vector, and returns a reference to it.
2. **Template Functions:**
    - `getComponentTypeID`: Generates unique IDs for component types at compile-time. It uses a static variable `lastID` to assign a unique ID to each component type.
3. **Templates in** `Entity` **class:**
    - `hasComponent`: Checks if an entity has a specific type of component using the `componentBitSet`.
    - `addComponent`: Adds a new component of a specified type to the entity. It creates the component, assigns it to the entity, and updates the bitset and array accordingly.
    - `getComponent`: Retrieves a reference to a component of a specified type.

#### How It Works:

1. **Entity Creation:**
    - Entities are created using the `addEntity` function of the `Manager` class.
    - Each entity has a collection of components (stored in the `components` vector).
2. **Component Management:**
    - Components are added to an entity using the `addComponent` function. This function creates a new component, associates it with the entity, and updates the bitset and array accordingly.
3. **Update and Draw:**
    - The `update` and `draw` functions of the `Entity` class iterate through the components of an entity and call their respective `update` and `draw` functions.
4. **Refresh:**
    - The `refresh` function of the `Manager` class removes inactive entities from the `entities` vector. Entities can be deactivated using the `destroy` function.

#### Example Usage:

```
Manager manager;

Entity& player = manager.addEntity();
player.addComponent<PositionComponent>(10, 20);
player.addComponent<RenderComponent>("player.png");

Entity& enemy = manager.addEntity();
enemy.addComponent<PositionComponent>(30, 40);
enemy.addComponent<RenderComponent>("enemy.png");

// Game Loop
while (gameIsRunning) {
    manager.update();
    manager.draw();
    manager.refresh();
}
```

In this example, `PositionComponent` and `RenderComponent` are components that handle the position and rendering of entities, respectively.

### Character creation

I can create characters either programmatically (as in the above example) or by importing a `json` or `csv` file that contains all the relevant data. 

### What's a character?

The parts that define a character in my implementation are:

1. Stats
2. Traits
3. Quirks

### Stats

Stats are hard numbers like **health**, **patience** or **vocabulary**. Think of it as keys that unlock different options depending on the number. 

*Example*

> A character with **low patience** will stop idling and start exploring different avenues.

### Traits

Traits are bit softer. It's more like a tag. A trait could be scrappy, violent or verbose. These traits don't do anything by themselves but coupled with stats they act as an amplifier. A trait is something that defines a person. 

*Example*

> A **violent** character with low **patience** will engage with the environment, other npcs and the player in hostile ways.

### Quirks

Quirks are basically die rolls. It is something that gives the character a wrinkle. A quirk could be **hypochondriac**, **swiftie** or **psychopath** (not exactly a quirk, but ya know)

*Example*

> A **violent** character with low **patience** and who is a **hypochondriac** might start shouting at people from a distance or throw things at them and back away when they get closer. 

Let's look at the stats component as an example

```c++
struct CharacterStats
{
	std::unordered_map<std::string, float> traits;

	CharacterStats()
	{
		traits["Anger"] = 10.0f;
		traits["Patience"] = 90.0f;
		traits["Vocabulary"] = 50.0f;
	}

};
```

```c++
	float getTrait(const std::string& traitName) const
	{
		auto trait = characterTraits.traits.find(traitName);
		if (trait != characterTraits.traits.end())
		{
			return trait->second;
		}

		return 0.0f;
	}

	void setTrait(const std::string& traitName, float value)
	{
		characterTraits.traits[traitName] = value;
	}

	void modifyTrait(const std::string& traitName, float value)
	{
		auto trait = characterTraits.traits.find(traitName);
		if (trait != characterTraits.traits.end())
		{
			characterTraits.traits[traitName] += value;
		}
	}
```

#### Serialization and deserialization to handle data

This is the meat of the Beef System. Here is where we update and handle all data connected to the characters in the game. At first glance it might look like it's just a save file as any other, but the implications are far greater. 

#### The workflow

Ideally the workflow would look something like: 
1. Start game 
2. Read one or more files that populate an NPC with all needed components and traits, events, backstory etc.  
3. Update the NPC during the game depending on interactions with the player
4. Save all changes intermittently and also saving when quitting the game.

If we can pick and choose which parts to save at a component level it allows us to just save data that is pertinent to a certain character. Key characters will need more things like stats, traits, position, event log etc while a "jobber" need little to no data. We don't have to save a full game object but rather small pieces, allowing for a more performant and scalable solution.

Employing dynamic memory management techniques allows the Beef System to adapt to changing demands. Resources are allocated and deallocated as NPCs are created, modified, or removed during gameplay. This dynamic allocation ensures that memory is efficiently utilized, preventing unnecessary consumption and potential bottlenecks.
  
Serialization and deserialization are essential processes in handling character data within the Beef System. Serialization involves converting complex data structures, such as the attributes and states of game characters, into a format that can be easily stored or transmitted, often as a file or a stream of bytes. This process is crucial for saving the current state of characters at specific points in the game, allowing for intermittent saves and enabling players to resume their progress.

On the other hand, deserialization is the reverse process, converting the serialized data back into its original complex structure. This step is vital during game loading, as it reconstructs the characters' states from previously saved data. By implementing serialization and deserialization, the Beef System ensures that character information, including statistics, traits, and quirks, can be efficiently stored, retrieved, and updated as players interact with the game world. This helps with game persistence and provides a foundation for dynamic and evolving character narratives, aligning with the system's goal of supporting emergent storytelling in both controlled and open-game scenarios.

#### Serialization Interface:

We have an interface called `Serializable`, to ensure that only components that implement this interface can be serialized. 

```cpp
class Serializable {
public:
    virtual void serializeToJSON(json& data) const = 0;
    virtual void deserializeFromJSON(const json& data) = 0;
    virtual ~Serializable() = default;
};
```

#### Serialization in Components:

Each component that needs to be serialized implements the `Serializable` interface. For example, in `TransformComponent`:

```cpp
class TransformComponent : public Component, public Serializable {
public:
    // Other members...

    void serializeToJSON(json& data) const override {
        data["Position X"] = position.x;
        // Add other relevant data...
    }

    void deserializeFromJSON(const json& data) override {
        position.x = data["Position X"];
        // Retrieve and set other relevant data...
    }
};
```

#### Serialization in CharacterEntity:

In `CharacterEntity` or any other entity that needs to be saved and loaded, I iterate over its components and call the `serializeToJSON` and `deserializeFromJSON` methods.

```cpp
void CharacterEntity::saveEntityState(const std::string& filePath) {
    json entityData;

    // Serialize each component's data
    for (auto& component : components) {
        auto serializable = dynamic_cast<Serializable*>(component.get());
        if (serializable) {
            serializable->serializeToJSON(entityData);
        }
    }

    // Save the entity state
    importer.saveData(filePath, entityData);
}

void CharacterEntity::loadEntityState(const std::string& filePath) {
    json entityData;

    // Load the entity state
    importer.loadData(filePath, entityData);

    // Deserialize each component's data
    for (auto& component : components) {
        auto serializable = dynamic_cast<Serializable*>(component.get());
        if (serializable) {
            serializable->deserializeFromJSON(entityData);
        }
    }
}
```

#### Saving and Loading Mechanism:

To save and load JSON data to/from a file I've created a `HandleData` class that, well, handles data

```cpp
#import "HandleData.h"

void HandleData::saveData(const std::string &data, const json& jsonData)
{
	std::ofstream outputFile(data);
	outputFile << std::setw(4) << jsonData;
	outputFile.close();
}

void HandleData::loadData(const std::string& data, json& jsonData)
{
	std::ifstream inputFile(data);
	inputFile >> jsonData;
	inputFile.close();
}
```

#### Usage:

I use the `saveEntityState` and `loadEntityState` methods of my entities to save and load their states.

```cpp
CharacterEntity character;
character.saveEntityState("savefile.json");

// Later...
character.loadEntityState("savefile.json");
```

These three things put together will indeed provide a solid foundation to both let designers create strongly controlled narratives or create something more akin to a simulation like the Sims or Dwarf Fortress. 

### Next steps
As it stands I have a system capable of creating characters and handle all sort of narrative data connected to these characters in a game. But as I mentioned in my preface this system integrates neatly with other parts of the codebase as well. We can use all this data to determine behavior of AI, dock into leveling systems or extract information to use to make decisions in dialogue trees or extract information to use in actual dialogue. 

### Bibliography

#### Toolchain

**Build environment**

[Cmake](https://cmake.org/)

**Dependency management**

[vcpkg](https://vcpkg.io/en/getting-started)

**IDE**

Visual Studio

**Libraries**

[SDL2](https://www.libsdl.org/)
[SDL2-image](https://www.libsdl.org/)
[nlohmann/json](https://github.com/nlohmann/json)
#### Resources

**General References**

[The SDL2 wiki](https://wiki.libsdl.org/SDL2/FrontPage)
ChatGPT

**ECS**

[Let's make games](https://www.youtube.com/@CarlBirch)

**Toolchain setup**

https://njakob.com/shorts/sdl2-setup-with-vcpkg
[Vcpkg documentation](https://github.com/microsoft/vcpkg#using-vcpkg-with-cmake)
[Cmake documentation](https://cmake.org/cmake/help/latest/index.html)