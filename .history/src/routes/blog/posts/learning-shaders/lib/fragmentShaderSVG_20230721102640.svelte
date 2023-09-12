<svg width="300" height="300">
    <defs>
        <marker id="arrow" viewBox="0 -5 10 10" refX="5" refY="0" markerWidth="4" markerHeight="4" orient="auto">
          <path d="M0,-5L5,0L0,5L-5,0Z" />
        </marker>
    </defs>
    <circle cx="150" cy="150" r="100" stroke="black" fill="red" >
        <animate
        attributeName="r"
        values="50;100;50"
        dur="10s"
        repeatCount="indefinite" />
    </circle>
    <line x1="20" y1="220" x2="280" y2="220" stroke="black" stroke-width="3" marker-end="url(#arrow)" />
</svg>