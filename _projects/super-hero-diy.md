---
title: Superhero DIY
---

# Superhero DIY
 

- **My role:** Intern/Programmer 
- **Studio:** ACE
- **Developed:** 2023 November - 2024 May
- **Engine:** Unity
- **Language:** C#
- **Genre:** Mobile game, Idle, Mid-core

### Overview

Superhero DIY is a idle/midcore game developed by ACE

### My contribution

**Spinhandler**

I was in the very fortunate position to be ablo to contribute in every level of game development. I joined the team shortly after they've left the prototyping stage and could start in a well defined and up and running project. The first thing I got to work on was to add a spin effect to the character creation screen. It was a good starting point to familiarize myself with the code base and work on something that touched many different parts of the code without running the risk of actually breaking something. It's not mind blowing code in any way, but it was a good reminder that not all code have to be big brain, over engineered and ego stroking. Sometimes all you need is a simple if else check in the update function.

<div class="grid grid-cols-3 gap-1">
    <img class="col-span-1" src="/src/img/superhero-diy-1.gif">
    <img class="col-span-1" src="/src/img/superhero-diy-2.gif">
    <img class="col-span-1" src="/src/img/superhero-diy-3.gif">
</div>

<pre class="text-wrap hljs">
<code class="language-cpp">
    private void HandleMouseInput()
    {
        if (Input.GetMouseButtonDown(0))
        {
            _resetObject?.Kill();
            _resetObject = null;
            
            _frameCount = 0;
            
            //If the player release and then clicks again quickly we don't want to stop the momentum
            if (_timeBetweenClickAndRelease > 0.3f) 
            {
                _hasMomentum = false;
            }

            _startPosition = Input.mousePosition.x;
            _startTime = Time.time;
        }

        if (Input.GetMouseButton(0))
        {
            _currentPosition = Input.mousePosition.x;
            var rotateAmount = -Input.GetAxis("Mouse X") * _rotationSensitivity * Time.deltaTime;
            transform.Rotate(Vector3.up, rotateAmount);
            
            //Calculate the frame count to see if the player has been holding the mouse button for a while
            if (Mathf.Abs(_currentPosition - _lastPosition) < 1)
            {
                _frameCount++;
            }

            _lastPosition = Input.mousePosition.x;

        }

        if (Input.GetMouseButtonUp(0))
        {
            //If the player has been holding the mouse button for a while, we don't want to spin the object
            if (_frameCount >= _spinThreshold)
            {
                ResetRotation();
                return;
            }

            _endPosition = Input.mousePosition.x;
            _endTime = Time.time;

            //Calculate the speed of the spin
            float mouseDistance = Mathf.Abs(_startPosition - _endPosition);
            _spinSpeed = mouseDistance / (_endTime - _startTime);
            _spinSpeed *= _spinSensitivity;
            
            //Calculate the direction of the spin
            _direction = Mathf.Sign(_startPosition - _endPosition);

            //If the spin is too slow, we don't want to spin the object
            if (mouseDistance > 1f)
            {
                _spinVelocity = (_spinSpeed * _direction);
                _hasMomentum = true;
                _frameCount = 0;
            }

            _timeBetweenClickAndRelease = _endTime - _startTime;
        }
    }

    private void ResetRotation()
    {
        _resetObject = transform.DOLocalRotate(_startRotation, 1f).SetId(this).SetEase(Ease.OutCubic).OnComplete(() => _resetObject = null);

        _hasMomentum = false;
    }
</code>
</pre>

**VFX**





### Team: 

All the talented people at ACE