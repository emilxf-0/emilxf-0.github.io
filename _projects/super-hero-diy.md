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

Superhero DIY is a idle/midcore game developed by ACE in Gothenburg. I was in the very fortunate position to be ablo to contribute in every level of game development. I joined the team shortly after they've left the prototyping stage and could start in a well defined and up and running project.

### My contribution

**Spinhandler**

The first thing I got to work on was to add a spin effect to the character creation screen. It was a good starting point to familiarize myself with the code base and work on something that touched many different parts of the code without running the risk of actually breaking something. It's not mind blowing code in any way, but it was a good reminder that not all code have to be big brain, over engineered and ego stroking. Sometimes all you need is a simple if else check in the update function.

<div class="grid grid-cols-3 gap-1">
    <img class="col-span-1" src="/src/img/superhero-diy-1.gif">
    <img class="col-span-1" src="/src/img/superhero-diy-2.gif">
    <img class="col-span-1" src="/src/img/superhero-diy-3.gif">
</div>

<details>
<summary>For the code curious</summary>
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
</details>
**VFX**

I've always liked the visual aspect of game development and I got the opportunity to work with both animations and VFX during this project. The VFX part was particularily interesting as I had to create my own textures and shaders in shadergraph (really chomping at the bit to get into some hlsl programming though). I got to create auras for every different power in the game.

<div class="grid grid-cols-3 grid-rows-3 gap-1">
    <img class="col-span-1" src="/src/img/gif/fireaura.gif">
    <img class="col-span-1" src="/src/img/gif/iceaura.gif">
    <img class="col-span-1" src="/src/img/gif/lightningaura.gif">
    
    <img class="col-span-1" src="/src/img/gif/mutantaura.gif">
    <img class="col-span-1" src="/src/img/gif/plantaura.gif">
    <img class="col-span-1" src="/src/img/gif/strengthaura.gif">

    <img class="col-span-1" src="/src/img/gif/wateraura.gif">
    <img class="col-span-1" src="/src/img/gif/windaura.gif">

</div>

**Animation**

Most of the animation in SuperHero is done by using Mixamo, but for the creation screen we needed to create something custom that played well with the different powers. Just like with the auras I got to create animations for every major power in the game (edge cases not withstanding). I learned a great deal about studying reference material, creating looping poses that aren't jarring but still stands out.

<div class="grid grid-cols-3 grid-rows-1 gap-1">
    <img class="col-span-1" src="/src/img/gif/wolverine.gif">
    <img class="col-span-1" src="/src/img/gif/bat.gif">
    <img class="col-span-1" src="/src/img/gif/gunz.gif">
</div>

**Movement**

I got to code a fair bit as well. One of the play modes is a Alien invasion-like thing where the hero chases after, and gets attacked by, criminals. I got to build out the movement system for enemies and helpers.

<img class="content-center" src="/src/img/gif/movement.gif">

<details>
<summary>Base Movement</summary>
<pre class="text-wrap hljs">
<code class="language-cpp">

public abstract class InvasionUnitMovementBase : MonoBehaviour, IUnitEventListener
{
protected InvasionUnitBody Body = null;

    protected Vector3 OriginPosition = Vector3.zero;
    protected float OriginRadius = -1f;

    public abstract float NormalizedRunSpeed { get; }

    public virtual void SetSpawnerData(Vector3 spawnerOrigo, float spawnerRadius)
    {
        OriginPosition = spawnerOrigo;
        OriginRadius = spawnerRadius;
    }

    protected Vector3 RandomPositionWithinRadius(Vector3 centerPosition, float radius)
    {
        return centerPosition + Quaternion.AngleAxis(UnityEngine.Random.Range(0f, 360f), Vector3.up) * (Vector3.forward * radius * UnityEngine.Random.Range(0f, 1f));
    }

    protected abstract void HandleMovement();

    public virtual void InitInterface(InvasionUnitBody invasionUnit)
    {
        Body = invasionUnit;
    }

    public virtual void OnTargetAdded(ITargetable target)
    {
    }

    public virtual void OnTargetRemoved(ITargetable target)
    {
    }

    public virtual void OnStateUpdated(InvasionUnitState updatedState)
    {
    }

}
</code>

</pre>
</details>

<details>
<summary>
Movement for Assistant
</summary>
<pre class="text-wrap hljs">
<code class="language-cpp">
public class InvasionUnitMovementRocketeering : InvasionUnitMovementBase
{
    [SerializeField] private float _directionChangeInterval = 10f;
    [SerializeField] private float _speed = 1f;
    [SerializeField] private Vector3 _direction = Vector3.zero;

    private float _startTime = 0f;

    public override float NormalizedRunSpeed { get; }

    void Start()
    {
       _startTime = Time.time;
       _direction = UpdateDirection(45);
    }

    void Update()
    {
        HandleMovement();
    }


    protected override void HandleMovement()
    {
        if (_startTime + _directionChangeInterval < Time.time)
        {
            _direction = UpdateDirection(45);
            _startTime = Time.time;
        }

        transform.position += _speed * Time.deltaTime * _direction;
        
    }

    private Vector3 UpdateDirection(float degrees)
    {
        var angleIncrement = degrees * Random.Range(0, 2) * 2 - 1;

        var currentAngle = Mathf.Atan2(_direction.x, _direction.z) * Mathf.Rad2Deg;
        var newAngle = currentAngle + angleIncrement;
        var dir = Quaternion.Euler(0, newAngle, 0) * Vector3.forward;

        return dir.normalized;
       
    }

}
</code>

</pre>
</details>


<details>
<summary>
Movement for Flying enemies
</summary>
<pre class="text-wrap hljs">
<code class="language-cpp">
public class InvasionUnitMovementRocketeering : InvasionUnitMovementBase
{
    [SerializeField] private float _directionChangeInterval = 10f;
    [SerializeField] private float _speed = 1f;
    [SerializeField] private Vector3 _direction = Vector3.zero;

    private float _startTime = 0f;

    public override float NormalizedRunSpeed { get; }

    void Start()
    {
       _startTime = Time.time;
       _direction = UpdateDirection(45);
    }

    void Update()
    {
        HandleMovement();
    }


    protected override void HandleMovement()
    {
        if (_startTime + _directionChangeInterval < Time.time)
        {
            _direction = UpdateDirection(45);
            _startTime = Time.time;
        }

        transform.position += _speed * Time.deltaTime * _direction;
        
    }

    private Vector3 UpdateDirection(float degrees)
    {
        var angleIncrement = degrees * Random.Range(0, 2) * 2 - 1;

        var currentAngle = Mathf.Atan2(_direction.x, _direction.z) * Mathf.Rad2Deg;
        var newAngle = currentAngle + angleIncrement;
        var dir = Quaternion.Euler(0, newAngle, 0) * Vector3.forward;

        return dir.normalized;
       
    }

}
</code>

</pre>
</details>

<details>
<summary>
Movement for Fleeing enemies
</summary>
<pre class="text-wrap hljs">
<code class="language-cpp">
public class InvasionUnitMovementFleeing : InvasionUnitMovementWanderingAround
{
    [SerializeField] private float _topSpeed = 1f;
    [SerializeField] private float _secondsUntilMaxChaseSpeed = 1f;
    [SerializeField] private AnimationCurve _chaseAccelerationCurve = null;

    private float _timeSpentChasing = 0f;
    public override float NormalizedRunSpeed => _navMeshAgent.velocity.magnitude / _topSpeed;

    protected override void Awake()
    {
        base.Awake();
    }

    private void Start()
    {
        
        if (_secondsUntilMaxChaseSpeed <= 0f)
            _secondsUntilMaxChaseSpeed = 0.001f;
    }

    private void Update()
    {
        HandleMovement();
    }

    public override void OnTargetAdded(ITargetable target)
    {
        base.OnTargetRemoved(target);

        if (Body.Targets.Count == 1)
        {
            Body.SetState(InvasionUnitState.RunningTowardsDestination);
        }
    }

    public override void OnTargetRemoved(ITargetable target)
    {
        base.OnTargetRemoved(target);

        if (Body.Targets.Count == 0)
        {
            _timeSpentChasing = 0f;
            Body.SetState(InvasionUnitState.Waiting);
        }
    }

    public override void OnStateUpdated(InvasionUnitState updatedState)
    {
        base.OnStateUpdated(updatedState);

        switch (updatedState)
        {
                case InvasionUnitState.ReachingDestination:
                if (Body.Targets.Count > 0)
                {
                    Body.SetState(InvasionUnitState.RunningTowardsDestination);
                }
                else
                {
                    Body.SetState(InvasionUnitState.Waiting);
                }
                break;
        }
    
    }

    protected override void HandleMovement()
    {
        //base handles the waiting/wandering around state
        base.HandleMovement();

        if (Body.CurrentUnitState == InvasionUnitState.RunningTowardsDestination)
        {
            if (Body.Targets.Count == 0)
            {
                Body.SetState(InvasionUnitState.Waiting);
                return;
            }

            if (_timeSpentChasing < 1f)
            {
                _timeSpentChasing += (Time.deltaTime / _secondsUntilMaxChaseSpeed);
                _navMeshAgent.speed = _chaseAccelerationCurve.Evaluate(_timeSpentChasing) * _topSpeed;
            }
            _navMeshAgent.SetDestination(transform.position + (transform.position - Body.Targets[0].TargetTransform.position).normalized);
        }
       
    }
}
</code>

</pre>
</details>

<details>
<summary>
Movement for Chasing enemies
</summary>
<pre class="text-wrap hljs">
<code class="language-cpp">
public class InvasionUnitMovementChasing : InvasionUnitMovementWanderingAround
{
    [SerializeField] private bool _chaseOnTargeted = true;
    [SerializeField] private float _removeDistanceFromTarget = 0.5f;
    [SerializeField] private float _topSpeed = 1f;
    [SerializeField] private float _secondsUntilMaxChaseSpeed = 1f;
    [SerializeField] private float _idleTimeAfterCatchingChaseTarget = 1f;
    [SerializeField] private AnimationCurve _chaseAccelerationCurve = null;

    //private ITargetable _currentTarget;

    private float _currentRemoveDistance = 0f;
    private float _timeSpentChasing = 0f;
    public override float NormalizedRunSpeed => _navMeshAgent.velocity.magnitude / _topSpeed;

    protected override void Awake()
    {
        base.Awake();
    }

    private void Start()
    {

        if (_secondsUntilMaxChaseSpeed <= 0f)
            _secondsUntilMaxChaseSpeed = 0.001f;
        // Try to register if we are HURT to force add a target to the list
        if (_chaseOnTargeted && TryGetComponent(out InvasionUnitHealth health))
        {
            health.Hurt += T => Body.AddTarget(T);
        }
    }

    private void Update()
    {
        HandleMovement();
    }

    public override void OnTargetAdded(ITargetable target)
    {
        base.OnTargetRemoved(target);

        if (Body.Targets.Count == 1)
        {
            //_currentTarget = target;
            //_currentRemoveDistance = Vector3.Distance(target.TargetTransform.position, transform.position) + _removeDistanceFromTarget;
            Body.SetState(InvasionUnitState.RunningTowardsDestination); // can interrupt completing action state? fix this
        }
    }

    public override void OnTargetRemoved(ITargetable target)
    {
        base.OnTargetRemoved(target);

        if (Body.Targets.Count == 0)
        {
            _timeSpentChasing = 0f;
            Body.SetState(InvasionUnitState.Waiting);
        }
    }

    public override void OnStateUpdated(InvasionUnitState updatedState)
    {
        base.OnStateUpdated(updatedState);

        switch (updatedState)
        {
            case InvasionUnitState.RunningTowardsDestination:
                _navMeshAgent.SetDestination(RandomPositionWithinRadius(OriginPosition, OriginRadius));
                _timeSpentChasing = 0f;
                break;
            case InvasionUnitState.CompletingAction:
                _navMeshAgent.speed = _idleSpeed;
                _navMeshAgent.SetDestination(RandomPositionWithinRadius(OriginPosition, OriginRadius));
                this.RunAfterDelay(_idleTimeAfterCatchingChaseTarget, () => ChaseIfTargetStillNearby());
                break;
            case InvasionUnitState.ReachingDestination:
                if (Body.Targets.Count > 0)
                    Body.SetState(InvasionUnitState.RunningTowardsDestination);
                else
                    Body.SetState(InvasionUnitState.Waiting);
                break;
            case InvasionUnitState.Dying:
                //_navMeshAgent.isStopped = true;
                //_navMeshAgent.enabled = false;
                break;
        }
    }

    protected override void HandleMovement()
    {
        //base handles the waiting/wandering state
        base.HandleMovement();

        if (Body.CurrentUnitState == InvasionUnitState.RunningTowardsDestination)
        {
            if (Vector3.Distance(transform.position, _navMeshAgent.destination) < 1f)
            {
                Body.SetState(InvasionUnitState.ReachingDestination);
            }

            if (_timeSpentChasing < 1f)
            {
                _timeSpentChasing += (Time.deltaTime / _secondsUntilMaxChaseSpeed);
                _navMeshAgent.speed = _chaseAccelerationCurve.Evaluate(_timeSpentChasing) * _topSpeed;
            }

            if (Body.Targets.Count >= 1)
                _navMeshAgent.SetDestination(Body.Targets[0].TargetTransform.position);
            // Remove all targets when the distance is to much
            //if (Vector3.Distance(transform.position, _currentTarget.TargetTransform.position) > _currentRemoveDistance)
            //{
            //    _currentTarget = null;
            //    Body.RemoveAllTargets();
            //    Body.SetState(InvasionUnitState.Waiting);
            //}
        }
    }

    private void ChaseIfTargetStillNearby()
    {
        //_navMeshAgent.isStopped = false;

        if (Body.Targets.Count >= 1)
        {
            //_currentTarget = Body.Targets[0];
            Body.SetState(InvasionUnitState.RunningTowardsDestination);
        }
        else
        {
            Body.SetState(InvasionUnitState.Waiting);
        }
    }
}
</code>

</pre>
</details>

<details>
<summary>
Movement for Idle enemies
</summary>
<pre class="text-wrap hljs">
<code class="language-cpp">
[RequireComponent(typeof(NavMeshAgent))]
public class InvasionUnitMovementWanderingAround : InvasionUnitMovementBase
{
    public override float NormalizedRunSpeed { get; }

    protected NavMeshAgent _navMeshAgent;
    private float _timer = 0f;
    private float _timeToWait = 0f;
    [SerializeField] protected float _idleSpeed = 1.5f;

    protected virtual void Awake()
    {
        _navMeshAgent = GetComponent<NavMeshAgent>();

        if (_navMeshAgent == null)
        {
            Debug.LogError("NavMeshAgent not found on " + gameObject.name);
        }
    }

    public override void OnStateUpdated(InvasionUnitState updatedState)
    {
        switch (updatedState)
        {
            case InvasionUnitState.Waiting:
                _navMeshAgent.SetDestination(RandomPositionWithinRadius(OriginPosition, OriginRadius));
                _timer = 0f;
                _timeToWait = Random.Range(0.5f, 1.5f);
                _navMeshAgent.speed = _idleSpeed;
                break;
        }
    }

    protected override void HandleMovement()
    {
        if (Body.CurrentUnitState == InvasionUnitState.Waiting) 
        {

            if (_timer < _timeToWait && Vector3.Distance(transform.position, _navMeshAgent.destination) < 1f) 
            {
                _timer += Time.deltaTime;
                return;
            }

            if (Vector3.Distance(transform.position, _navMeshAgent.destination) < 1f) {
                Body.SetState(InvasionUnitState.ReachingDestination);
            }
        }
    }
}
</code>

</pre>
</details>

### Team:

All the talented people at ACE
