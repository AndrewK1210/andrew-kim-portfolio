export type Discipline =
  | 'Hardware'
  | 'Software'
  | 'Mechanical'
  | 'Mechanical design'
  | 'CAD'
  | 'Prototyping'
  | 'Engineering design process'

export type Project = {
  slug: string
  title: string
  summary: string
  year: string
  duration: string
  team: string
  disciplines: Discipline[]
  image: string
  imageAlt: string
  goal: string[]
  role: { summary: string; contributions: string[] }
  decisions: { title: string; detail: string }[]
  debugging: {
    problem: string
    investigation: string
    fix: string
    image?: { src: string; alt: string; caption: string }
  }[]
  result: { summary: string; nextTime: string[] }
  specs?: { label: string; value: string }[]
  visuals: { src: string; alt: string; caption: string }[]
  stack: string[]
  links: { label: string; href: string }[]
  hearIt?:
    | { type: 'audio' | 'video'; src: string; caption: string }
    | { type: 'youtube'; videoId: string; title: string; caption: string }
  signalChain?: string[]
}

export const projects: Project[] = [
  {
    slug: 'snoopy-distortion',
    title: 'Snoopy Distortion',
    summary: 'An op-amp distortion pedal I simulated, breadboarded, laid out in KiCad, and built into a custom-printed enclosure, while documenting every stage as a video series.',
    year: '2026',
    duration: '5 months',
    team: 'Solo',
    disciplines: ['Hardware', 'Mechanical'],
    image: '/projects/snoopy-distortion/pedal%20front.jpg',
    imageAlt: 'Finished Snoopy Distortion pedal in its white custom-printed enclosure',
    goal: [
      "I’m an electrical engineering student who had never designed an analog audio circuit. I wanted to build a guitar pedal from scratch, designing each stage myself rather than copying a schematic or using a kit.",
      "My sound goal was distortion with clarity and definition that still felt warm and open, with the ProCo RAT as my reference for the architecture.",
      "I also set myself a documentation goal: record the whole process as a short-form video series, including the mistakes."
    ],
    role: {
      summary: 'TODO: Add a summary of your role on the project.',
      contributions: ['TODO: Add your project contributions.'],
    },
    decisions: [
      {
        title: 'True bypass with a 3PDT footswitch',
        detail:
          'The 3PDT footswitch leaves the signal untouched when the pedal is off.',
      },
      {
        title: 'Board-mounted pots and an off-board LED',
        detail:
          'Board-mounted pots set the PCB width to the enclosure’s approximately 43 mm internal cavity, so the layout needed vertical components. I wired the LED off-board to reduce drilling-tolerance risk.',
      },
      {
        title: 'Custom 1590B enclosure and panel',
        detail:
          'The white 1590B has custom drilling and UV printing from Tayda. I added 0.4 mm to every hole diameter because powder coat is applied after drilling. The artwork is an original dog-ear design.',
      },
    ],
    signalChain: ['Input', 'TL072 gain stage', 'Diode clipping', 'Tone', 'Volume', 'Output'],
    debugging: [
      {
        problem: 'No distortion in simulation.',
        investigation:
          'The signal sounded clean in Reaper. I traced the circuit and found the diodes and speaker both wired from the op-amp output to ground, so the signal reached the speaker without passing through the clipping stage. My second attempt also had both diodes facing the same way.',
        fix: 'Put the clipping stage in the signal path and make the diodes anti-parallel.',
      },
      {
        problem: 'Asymmetric, weak clipping on the breadboard.',
        investigation:
          'The diodes were ground-referenced, but the op-amp output sat at about 4.5 V DC. Only one diode ever conducted, so sustain was poor.',
        fix: 'Add a 1 µF coupling capacitor before the diode junction so the diodes clip symmetrically.',
      },
      {
        problem: 'Squealing at high gain.',
        investigation:
          'The first prototype squealed because long jumper wires were acting as antennas and feeding RF into the op amp. Later, squeal at high gain came from the unused half of the TL072 being left floating, plus too much loop gain at the top of the 1M gain pot.',
        fix: 'Use shorter wires and tie off the unused op-amp half (pins 1 and 2 shorted, pin 3 to ground). A 1M resistor in parallel with the gain pot caps its effective maximum at about 500k.',
      },
      {
        problem: '60 Hz hum.',
        investigation:
          'The hum changed when I unplugged a nearby lamp, got louder when I touched the DC jack, dropped with a grounded foil shield, and had a clean 60 Hz tone.',
        fix: 'The grounded metal enclosure eliminated it.',
      },
      {
        problem: 'I ordered the wrong PCB revision.',
        investigation:
          'After v1 arrived, I realized the coupling capacitor (C4) needed to sit before the clipping diodes, not after. A re-order would have meant weeks of waiting.',
        fix: 'Hand-modified v1 with bodge wires, soldering pad-to-pad where the component legs were too fragile. It cost me time but noticeably improved my soldering.',
      },
      {
        problem: 'The DC jack stopped delivering power.',
        investigation: 'A lug bent and broke while I was fitting the jack into the enclosure.',
        fix: 'I identified the legs with an LED continuity tester and rewired it.',
      },
    ],
    result: {
      summary:
        'The finished pedal works and lives in a custom-printed enclosure. The 60 Hz hum is gone, and the squeal is resolved for the gain knob. TODO: Describe the finished pedal’s sound. TODO: Confirm whether the volume-knob fix is verified and update this summary.',
      nextTime: [
        'Check the schematic against the PCB layout before ordering boards, so I do not pay for a wrong revision',
        'Experiment with a small capacitor across the clipping diodes to soften fizz',
        'Order the PCBs, enclosure, and parts earlier so the build is not limited by shipping',
      ],
    },
    specs: [
      { label: 'Supply', value: '9V DC, center-negative' },
      { label: 'Op-amp', value: 'TL072' },
      { label: 'Controls', value: 'Gain, Tone, Volume' },
      { label: 'Bypass', value: 'True bypass (3PDT)' },
      { label: 'Board', value: '2-layer PCB, about 50 × 45 mm, 2 revisions' },
      { label: 'Build', value: 'May to TODO: month 2026' },
    ],
    visuals: [
      {
        src: '/projects/snoopy-distortion/pedal%20front.jpg',
        alt: 'Finished Snoopy Distortion pedal in its white custom-printed enclosure',
        caption: 'Final pedal front panel.',
      },
      {
        src: '/projects/snoopy-distortion/v2%20schematic.png',
        alt: 'Version 2 KiCad schematic for the Snoopy Distortion pedal',
        caption: 'Updated KiCad schematic.',
      },
      {
        src: '/projects/snoopy-distortion/pedal%20back.jpeg',
        alt: 'Inside the finished pedal, showing the circuit board and footswitch wiring',
        caption: 'Inside the finished pedal enclosure.',
      },
      {
        src: '/projects/snoopy-distortion/pcb.png',
        alt: 'Top view of the Snoopy Distortion printed circuit board layout',
        caption: 'PCB layout (top view).',
      },
      {
        src: '/projects/snoopy-distortion/pcb%203d%20viewer.png',
        alt: 'Three-dimensional render of the Snoopy Distortion circuit board with components',
        caption: '3D view of the PCB.',
      },
    ],
    stack: [
      'LiveSPICE',
      'Reaper',
      'KiCad',
      'Inkscape',
      'Stompbox Layout Editor',
      'PCBWay',
      'Tayda',
    ],
    links: [
      { label: 'TODO: Add video series URL', href: '#' },
      { label: 'TODO: Add demo clip URL', href: '#' },
    ],
  },
  {
    slug: 'lead-pipe-extraction-robot',
    title: 'Lead Pipe Extraction Robot',
    summary:
      'A compact robot concept that travels inside a narrow service line, cuts the lead pipe from the inside, and pulls the segments out, so municipalities can replace aging lead service lines with minimal excavation.',
    year: 'TODO: Add year',
    duration: 'TODO: Add duration',
    team: 'TODO: Add team size (team project)',
    disciplines: ['Mechanical design', 'CAD', 'Prototyping', 'Engineering design process'],
    image: '/projects/lead-extraction/Side%20view%20of%20our%20final%20prototype%2C%20with%20all%20subsystems%20integrated.png',
    imageAlt: 'Side view of our final prototype, with all subsystems integrated',
    goal: [
      'Concerns about lead contamination in drinking water make replacing lead service lines a priority, but current methods are labour-intensive, disruptive, and costly.',
      'Our goal was to design a compact device that could travel through a pipe and remove segments with minimal excavation.',
    ],
    role: {
      summary: 'TODO: State your role on the team.',
      contributions: ['TODO: List what you personally did.'],
    },
    decisions: [
      {
        title: 'Followed the engineering design cycle',
        detail:
          'We started by researching the health risks and existing replacement methods, identified stakeholders, and turned their needs into design specifications.',
      },
      {
        title: 'Wide ideation, then structured screening',
        detail:
          'We generated ideas through brainstorming and creative techniques such as C-sketching, screened out impractical ideas or those that missed requirements, then ranked what remained using individual voting, pairwise comparison, and criterion-based ranking.',
      },
      {
        title: 'Robot-assisted removal over two alternatives',
        detail:
          'Our top three were pipe pulling with resin, melt and vacuum, and robot-assisted pipe removal. We scored them in a weighted decision matrix, built low-fidelity prototypes, and assessed risks. Robot-assisted removal had the best overall balance of safety, speed, and cost.',
      },
      {
        title: 'Two-carriage hinge for movement',
        detail:
          'We started with a simple rigid body. Early CAD tests showed it jammed on curves, so we moved to a two-carriage hinge that lets the robot take tight bends while keeping the wheels in contact with the pipe and staying stable.',
      },
      {
        title: '360 degree rotating cutting arm',
        detail:
          'A Dremel cutoff-wheel test on stainless steel, a harder metal than lead, confirmed that cutting was feasible. We adapted that into a virtual rotating arm that cuts the pipe evenly from the inside.',
      },
      {
        title: 'Hook anchoring to hold and extract',
        detail:
          'Anchoring started from friction-based cams that grip the pipe’s interior to stabilize the robot while cutting. We then developed a mechanical hook that grips the cut edge for extraction, which gave significantly greater holding force and ensured the robot could pull the pipe out.',
      },
      {
        title: 'Integrated final model',
        detail:
          'We combined the movement hinge, telescopic cutting arm, and anchoring hooks, and added a cable reel and a camera, into one virtual model.',
      },
    ],
    debugging: [
      {
        problem: 'The first movement design jammed on curves.',
        investigation:
          'Early CAD tests of a simple rigid body showed it could not get through bends in a narrow 1-inch pipe.',
        fix: 'Switched to a two-carriage hinge so the robot navigates tight bends while keeping the wheels in contact and staying stable.',
        image: {
          src: '/projects/lead-extraction/CAD%20showing%20robot%27s%20ability%20to%20navigate%20bends%20in%20a%20pipe.png',
          alt: "CAD showing robot's ability to navigate bends in a pipe",
          caption: "CAD showing robot's ability to navigate bends in a pipe",
        },
      },
      {
        problem: 'Cutting would need cooling and dust control.',
        investigation:
          'We tested cutting with a Dremel and a cutoff wheel on stainless steel as a stand-in for lead. It confirmed the cut was feasible but exposed the need for cooling and dust control.',
        fix: 'TODO: Add how cooling and dust control were addressed, or reword this as “identified and carried into the design as a requirement”.',
        image: {
          src: '/projects/lead-extraction/Physical%20testing%20-%20cutting%20stainless%20steel.jpg',
          alt: 'Physical testing - cutting stainless steel',
          caption: 'Physical testing - cutting stainless steel',
        },
      },
      {
        problem: "Friction-based anchoring wasn't strong enough for extraction.",
        investigation:
          'TODO: Confirm whether the cam anchor was inspired by friction cams and the hook was later found to hold much better.',
        fix: 'Developed a mechanical hook that grips the cut edge of the pipe, with significantly greater holding force.',
        image: {
          src: '/projects/lead-extraction/CADs%20of%20mechanical%20hook%20mechanism.png',
          alt: 'CADs of mechanical hook mechanism',
          caption: 'CADs of mechanical hook mechanism',
        },
      },
    ],
    result: {
      summary:
        'The integrated virtual prototype showed that all components can fit and function together inside a residential service line, making a compact and mechanically feasible lead-pipe extraction robot. It was validated in CAD and with targeted physical tests rather than a full physical build.',
      nextTime: [
        'TODO: Replace these suggestions with your own reflections. Suggested topics: build a working physical prototype, test cutting on actual lead, and validate cooling and dust control.',
      ],
    },
    specs: [
      { label: 'Pipe size', value: '1-inch service line' },
      {
        label: 'Subsystems',
        value: 'Movement hinge, telescopic cutting arm, anchoring hooks, cable reel, camera',
      },
      { label: 'Prototype type', value: 'Virtual (CAD) model with targeted physical tests' },
      { label: 'Course', value: 'APSC_O 169 Design Project' },
      { label: 'Cost / timeline / other figures', value: 'TODO: Add figures' },
    ],
    visuals: [
      {
        src: '/projects/lead-extraction/c-sketch.jpg',
        alt: 'C-sketch drawings from ideation',
        caption: 'C-sketch drawings from ideation',
      },
      {
        src: '/projects/lead-extraction/Table%20for%20ranking%20solutions%20-%20showcasing%20individual%20voting.png',
        alt: 'Table for ranking solutions - showcasing individual voting',
        caption: 'Table for ranking solutions - showcasing individual voting',
      },
      {
        src: '/projects/lead-extraction/Weighted%20Decision%20Matrix.png',
        alt: 'Weighted Decision Matrix',
        caption: 'Weighted Decision Matrix',
      },
      {
        src: '/projects/lead-extraction/Low-fidelity%20prototype%20sketch%20of%20pipe%20pulling%20with%20resin.jpg',
        alt: 'Low-fidelity prototype sketch of pipe pulling with resin',
        caption: 'Low-fidelity prototype sketch of pipe pulling with resin',
      },
      {
        src: '/projects/lead-extraction/Low-fidelity%20prototype%20sketch%20of%20%20melt%20%26%20vacuum.jpg',
        alt: 'Low-fidelity prototype sketch of melt & vacuum',
        caption: 'Low-fidelity prototype sketch of melt & vacuum',
      },
      {
        src: '/projects/lead-extraction/Low-fidelity%20prototype%20sketch%20of%20robotics%20assisted%20removal.jpg',
        alt: 'Low-fidelity prototype sketch of robotics assisted removal',
        caption: 'Low-fidelity prototype sketch of robotics assisted removal',
      },
      {
        src: '/projects/lead-extraction/CAD%20of%20robot%27s%20movement%20mechanism.png',
        alt: "CAD of robot's movement mechanism",
        caption: "CAD of robot's movement mechanism",
      },
      {
        src: '/projects/lead-extraction/Sketch%20of%20360%C2%B0%20rotating%20cutting%20arm.png',
        alt: 'Sketch of 360° rotating cutting arm',
        caption: 'Sketch of 360° rotating cutting arm',
      },
      {
        src: '/projects/lead-extraction/Testing%20a%20physical%20cam.png',
        alt: 'Testing a physical cam',
        caption: 'Testing a physical cam',
      },
      {
        src: '/projects/lead-extraction/CAD%20of%20anchoring%20mechanism.png',
        alt: 'CAD of anchoring mechanism',
        caption: 'CAD of anchoring mechanism',
      },
      {
        src: '/projects/lead-extraction/Side%20view%20of%20our%20final%20prototype%2C%20with%20all%20subsystems%20integrated.png',
        alt: 'Side view of our final prototype, with all subsystems integrated',
        caption: 'Side view of our final prototype, with all subsystems integrated',
      },
    ],
    stack: [
      'CAD',
      'C-sketching',
      'Weighted decision matrix',
      'Pairwise comparison',
      'Low-fidelity prototyping',
      'Physical testing',
      'TODO: Name the CAD software used',
    ],
    links: [
      {
        label: 'Project video',
        href: 'https://www.youtube.com/watch?v=BiK6Y-E3sEA',
      },
      { label: 'TODO: Link to the portfolio original write-up, if wanted', href: '#' },
    ],
    hearIt: {
      type: 'youtube',
      videoId: 'BiK6Y-E3sEA',
      title: 'Lead Pipe Extraction Robot project video',
      caption: 'Project video',
    },
  },
  {
    slug: 'volt-bldc-controller',
    title: 'Volt BLDC Controller',
    summary: 'Compact 60 A field-oriented motor driver.',
    year: '2024',
    duration: '5 months',
    team: 'Solo, with lab support',
    disciplines: ['Hardware', 'Software'],
    image: '/projects/pcb.png',
    imageAlt: 'Matte black printed circuit board motor controller with copper traces',
    goal: [
      'Our robot arm actuators needed a driver small enough to mount directly on the motor. The off-the-shelf options were either too large or produced noticeable torque ripple at low speed, which showed up as jitter at the end effector.',
      'Target: 60 A peak in a 42 × 42 mm footprint, with smooth torque down to 10 RPM.',
    ],
    role: {
      summary:
        'Sole designer for the hardware and firmware. A lab technician helped with board assembly, and my advisor reviewed the schematics.',
      contributions: [
        'Schematic capture and 4-layer PCB layout in KiCad',
        'Field-oriented control firmware on the STM32G4',
        'Built a dynamometer test rig for characterization',
      ],
    },
    decisions: [
      {
        title: 'STM32G4 over a dedicated motor-control IC',
        detail:
          'Dedicated FOC ICs are easier to bring up, but they lock you into their observer design. The G4 has hardware math accelerators (CORDIC and FMAC) that made a 20 kHz current loop practical, and it left room for custom low-speed compensation.',
      },
      {
        title: 'Low-side shunt current sensing',
        detail:
          'Inline sensing is more accurate but costs board area and needs isolated amplifiers. Three low-side shunts with careful ADC timing gave enough accuracy and kept the board within the footprint.',
      },
    ],
    debugging: [
      {
        problem: 'The current readings were noisy enough to make the motor audibly whine.',
        investigation:
          'An FFT of the ADC samples showed spikes at the PWM frequency. The ADC was sampling right at the switching edges.',
        fix: 'Moved the ADC trigger to the center of the low-side on-time and rerouted the shunt traces as Kelvin connections. Noise fell by about 12 dB.',
      },
    ],
    result: {
      summary:
        'Torque ripple was 38% lower than the previous driver, the board fit in 42 × 42 mm, and the motor stayed stable down to 8 RPM.',
      nextTime: [
        'Add an onboard temperature sensor near the FETs',
        'Expose a CAN-FD bus for daisy-chaining multiple actuators',
      ],
    },
    specs: [
      { label: 'Peak current', value: '60 A' },
      { label: 'Torque ripple', value: '−38%' },
      { label: 'Footprint', value: '42×42 mm' },
    ],
    visuals: [
      {
        src: '/projects/pcb.png',
        alt: 'Volt BLDC controller board',
        caption: 'Rev C board. The power stage is on the left and the MCU and gate driver are on the right.',
      },
      {
        src: '/projects/pcb-scope.png',
        alt: 'Oscilloscope screen showing three clean sinusoidal phase current waveforms',
        caption: 'Phase currents at 200 RPM after fixing the ADC timing.',
      },
    ],
    stack: ['KiCad', 'STM32', 'Embedded C', 'FOC', 'LTspice'],
    links: [
      { label: 'Schematics', href: '#' },
      { label: 'Firmware', href: '#' },
    ],
  },
  {
    slug: 'lattice-frame',
    title: 'Lattice Frame',
    summary: 'Generative-design quadcopter frame.',
    year: '2024',
    duration: '3 months',
    team: '2 engineers',
    disciplines: ['Mechanical'],
    image: '/projects/drone.png',
    imageAlt: 'Carbon fiber quadcopter frame with lattice-structured arms',
    goal: [
      'A university racing team wanted a stiffer frame to reduce vibration in their flight controller, but thicker carbon plates added weight they could not afford.',
      'The goal was to raise the first resonant mode above the motor operating band without adding mass.',
    ],
    role: {
      summary:
        'I ran the optimization and simulation work. My teammate handled manufacturing and flight testing.',
      contributions: [
        'Set up topology optimization with modal constraints',
        'FEA validation of 14 candidate geometries',
        'Designed the shaker-table test fixture',
      ],
    },
    decisions: [
      {
        title: 'Optimize for modal frequency, not just stiffness',
        detail:
          'Pure stiffness optimization produced frames that were stiff in bending but had torsional modes right in the motor band. Constraining the first mode directly gave better real-world results.',
      },
    ],
    debugging: [
      {
        problem: 'The simulated first mode was 410 Hz but the shaker test measured 320 Hz.',
        investigation:
          'The fixture itself was flexing. Testing the fixture alone showed its own resonance near 340 Hz.',
        fix: 'Redesigned the fixture from aluminum plate with a higher natural frequency. After that, the measured and simulated values agreed within 4%.',
      },
    ],
    result: {
      summary:
        'Delivered a frame 22% lighter than the previous design, with its first resonant mode at 410 Hz, well above motor frequencies. The team raced it for a full season.',
      nextTime: ['Run the fixture validation before the part tests, not after'],
    },
    specs: [
      { label: 'Weight', value: '−22%' },
      { label: 'First mode', value: '410 Hz' },
      { label: 'Iterations', value: '14' },
    ],
    visuals: [
      {
        src: '/projects/drone.png',
        alt: 'Lattice Frame quadcopter',
        caption: 'Final frame with the optimized lattice arms.',
      },
      {
        src: '/projects/drone-fea.png',
        alt: 'FEA simulation showing a color-coded stress map on a quadcopter arm',
        caption: 'Modal analysis of the first bending mode of a candidate arm.',
      },
    ],
    stack: ['Fusion 360', 'ANSYS', 'Topology opt.', 'CNC', 'Python'],
    links: [{ label: 'Case study', href: '#' }],
  },
  {
    slug: 'canopy-sensor-net',
    title: 'Canopy Sensor Net',
    summary: 'Solar-powered LoRa environmental sensors.',
    year: '2023',
    duration: '1 year',
    team: '3 engineers + research lab',
    disciplines: ['Hardware', 'Software'],
    image: '/projects/sensor.png',
    imageAlt: 'Small white 3D-printed sensor enclosure with an antenna and visible circuit board',
    goal: [
      'An ecology lab needed microclimate data (temperature, humidity, and light) from across a forest canopy where there is no Wi-Fi or cell coverage.',
      'The nodes had to run for a full year without battery swaps, because each one took a climbing crew to reach.',
    ],
    role: {
      summary:
        'I designed the node hardware and firmware, and built the ingestion pipeline to the lab database.',
      contributions: [
        'Low-power PCB design around the nRF52 and a LoRa radio',
        'Firmware in Rust with a power budget under 10 µA in sleep',
        'Gateway and dashboard backend in TypeScript and PostgreSQL',
      ],
    },
    decisions: [
      {
        title: 'LoRaWAN instead of a mesh network',
        detail:
          'A mesh network would have handled dense foliage better, but every node would have to stay awake to relay packets. A star topology with one tall gateway kept every node asleep more than 99.9% of the time.',
      },
    ],
    debugging: [
      {
        problem: 'Three nodes died after six weeks despite a calculated two-year battery life.',
        investigation:
          'Bench measurements showed a 400 µA sleep current on those boards. A pull-up resistor on the humidity sensor I²C line was back-feeding the sensor while it was powered down.',
        fix: 'Switched the sensor to a GPIO-controlled power rail and put the I²C pins in high-impedance mode during sleep. Sleep draw dropped to 4 µA.',
      },
    ],
    result: {
      summary:
        'Thirty nodes ran a full year untouched and streamed more than 2 million readings into the lab pipeline. The data supported one published paper.',
      nextTime: [
        'Add a supercapacitor buffer for cloudy weeks',
        'Support over-the-air firmware updates from the start',
      ],
    },
    specs: [
      { label: 'Nodes', value: '30' },
      { label: 'Uptime', value: '12 mo' },
      { label: 'Sleep draw', value: '4 µA' },
    ],
    visuals: [
      {
        src: '/projects/sensor.png',
        alt: 'Canopy sensor node',
        caption: 'Node enclosure with the solar cell and the antenna.',
      },
      {
        src: '/projects/sensor-plot.png',
        alt: 'Line chart of temperature and humidity readings over several days',
        caption: 'One week of canopy temperature and humidity from a single node.',
      },
    ],
    stack: ['nRF52', 'LoRaWAN', 'Rust', 'TypeScript', 'PostgreSQL'],
    links: [
      { label: 'Paper', href: '#' },
      { label: 'Source', href: '#' },
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
