---
title: Get Up
---

# Get Up
 
- **Developed:** 2023 September - October
- **Engine:** Unity
- **Language:** C#
- **Genre:** VR, Single player, Walking simulator


<button class="prose prose-a:text-white prose-a:no-underline prose-a:font-semibold bg-zinc-900 hover:scale-105 p-2 md:p-4 my-4  font-semibold">
<a href="https://github.com/sweviceroy/YrgoVRURP" target="_">Check out the full Repo</a>
</button>

### Overview

Get up is a VR walking sim set at the bottom of a pit. The goal is simply to walk to the top by balancing on some preeety sketchy-looking boards. 

### Gameplay Video

<div class="aspect-ratio">
<iframe class ="w-full h-full" width="560" height="315"  src="https://www.youtube.com/embed/Zkv-umJfA5c?si=lj5IrgRyK1tbwDFu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>


### Challenges

We wanted to explore spatial movement and the challenges of mitigating motion sickness due to the disconnect between perceived and physical movement. To do that we had to find a way for the player to move around in a limited space but still get the benefits of a relatively large game world. By letting the player move in a spiral motion we could keep the need for space to a minimum. VR doesn't play very nicely with collision since there is no way to stop the player from just moving indefinitely (barring physically restricting them, thankfully there are laws in place to stop of us from doing that) which usually means the world gets offset and mess up the placement of the game world. 

But on the other hand, we did need physics to handle the falling. It would be way too complicated to write our own gravitational logic in the short time span we had. So, we went with a hybrid solution instead. By raycasting from the headset and the controllers and then check if all three of them registered "open air" we could decide when to toggle on gravity.


### My contribution

**Vertical movement and foot tracking**

I was responsible for figuring out how to move vertically and how to track the feet. For a game so focused around vertigo it felt key to let the players see their feet, otherwise the illusion breaks far too easily. At first I tried to use the same technique that many other games use for tracking hands, by using the cameras on the front of the headset you can scan your hands and then they'll be mapped to a representation of your hand in game. The problem with that tehnique is that the hands despawns every time they are off camera and wonkiness will ensue. We opted for a more hardware centered approach instead...


![[Get up instructions]](../src/img/get-up-instructions.png)

By zip tying the controllers to a pair of crocs we had a fairly reliable solution, that solved many of our issues. But they also introduced a slew of new ones. The hawk eyed reader might have noticed that the controller on the foot is rotated in basically every axis - but the controllers themselves are designed in a way that "up" is always in the thumbs up direction. To fix that we had to do some pretty nifty (and nigh incomprehensible) rotational magic. 

<pre class="text-wrap hljs">
<code class="language-csharp">
private void AdjustFootRotation(Transform foot, Transform controller, float uphillRotation)
    {
        // Extracts the forward direction of the controller as it relates to the horizontal plane
        Vector3 controllerForward = Vector3.ProjectOnPlane(controller.forward, Vector3.up).normalized;

        // Gets the rotation of the controller
        Quaternion targetRotation = Quaternion.LookRotation(controllerForward, Vector3.up);

        // Apply the rotation to the foot
        foot.transform.rotation = targetRotation;

        // Extract the controller's rotation in the world space
        Quaternion worldRotation = controller.rotation;

        // Translate the world rotation to the local rotation of the foot
        Quaternion localRotation = Quaternion.Inverse(foot.transform.parent.rotation) * worldRotation;

        // Apply free-form rotation around the x and z axes
        float additionalRotationX = localRotation.eulerAngles.x;
        float additionalRotationZ = localRotation.eulerAngles.z;
        float additionalRotationy = offsetRightFootRotation.y;

        //Adds offset depending on right or left foot
        if (controller.gameObject.name == "Right Controller")
        {
            additionalRotationX = localRotation.eulerAngles.x + offsetRightFootRotation.x - uphillRotation;
            additionalRotationZ = localRotation.eulerAngles.z + offsetRightFootRotation.z;
        }
        else
        {
            additionalRotationX = localRotation.eulerAngles.x + offsetRightFootRotation.x - uphillRotation;
            additionalRotationZ = localRotation.eulerAngles.z - offsetRightFootRotation.z;
            additionalRotationy *= -1;
        
        }

        foot.transform.Rotate(Vector3.right, additionalRotationX);
        foot.transform.Rotate(Vector3.forward, additionalRotationZ);
        foot.transform.Rotate(Vector3.up, additionalRotationy);       
    }
</code>
</pre>

### Team: 
**Programmers**  

- Me  
- [Adam Hjelm](https://github.com/Adam-Hjelm) 
- [Henrik Nyström](https://github.com/sweviceroy) 

**Artists**

- [Alvin Alvrud](https://www.artstation.com/alvrudart)
- [Sandra Tollefsen](https://www.artstation.com/sandratollefsen)
- [Tom Hammar](https://www.artstation.com/tomhammar)