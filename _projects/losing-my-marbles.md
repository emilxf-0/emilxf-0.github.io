---
title: Losing My Marbles
---

![[Losing my marbles title.png]](../src/img/LMM.png)
 
# Losing My Marbles

- **Developed:** 2022 Nov - 2023 Jan
- **Engine:** Unity
- **Language:** C#
- **Networking:** Firebase
- **Genre:** Couch co-op, Party game, Tactical puzzle


<button class="prose prose-a:text-white prose-a:no-underline prose-a:font-semibold bg-zinc-900 hover:scale-105 p-2 md:p-4 my-4  font-semibold">
<a href="https://github.com/Llrac/losing-my-marbles" target="_">Check out the full Repo</a>
</button>

## Overview

Losing my marbles is a semi online, couch co-op game inspired by classic board game RoboRally [RoboRally](https://boardgamegeek.com/boardgame/18/roborally target="blank") and party game favorite [Jackbox](https://www.jackboxgames.com/). We created a 2D puzzle/race game as a 7-week project at [Yrgo](https://www.yrgo.se).

## Gameplay

The goal of the game is to collect three golden marbles before your opponents. Each player has one set of identical marbles that they use for movement and special attacks. On a turn a player get five marbles to choose from and must pick three of them before the timer runs out - otherwise the remaining slots will be randomly filled. The player order is determined by who locked in their selection of orders first. 

![[Losing my marbles countdown]](../src/img/losing-my-marbles-countdown.gif)

![[Losing my marbles gameplay]](../src/img/losing-my-marbles-turn-2.gif)

## Challenges

We really wanted to lean into the hidden selection and programming game mechanics of RoboRally and made the decision to use mobile phones as controllers fairly early in the process. This was a gamble since none of us had worked with any kind of networking before. We decided to give it a week to find out if we could at least send a string of text from a single phone to the game. We opted to use Firebase as it's pretty entry level and well documented. This really helped me wrap my head around how to push and pull data in a structured and logical way.

## My contribution at a glance

**Networking**

I was responsible for making networking work. That meant setting up a database that Unity could talk to, create a lobby to ensure that we could run more than one game at a time, and creating a separate build for the game controllers.

**UI**

I worked together with our lead designer Tom to make sure the ui was both beautiful and intuitive. We added a integrated but eye catching timer, some subtle ligthing to tell the player understand if a marble was selected or not and to alert them to if the controller was active or not.  

**Project management** 

I made sure everyone kept their focus, encouraged them to help each other out and did my best to keep the weekly goal as concrete as possible. None of us had been working together before and we had varying real life work experience before, so it was really humbling to disconnect the auto pilot and actually explain what a lot of these agile terms meant and how to think about them.   


### Team: 
**Programmers** 
- Me
- [Max Petersson](https://github.com/Max-Petersson)
- [Carl Lycke](https://github.com/llrac)
 
**Artists**  
- [Tom Hammar](https://www.artstation.com/tomhammar)
- [Sofia Bjerned Hansson](https://www.artstation.com/sofiabjernedhansson) 
- [Jenny-Li Levin](https://www.artstation.com/jenny-lilevin) 
