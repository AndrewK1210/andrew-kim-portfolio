import { SectionHeading } from '@/components/section-heading'

const groups = [
  {
    title: 'Mechanical',
    items: ['SolidWorks', 'ANSYS FEA', '3D printing', 'Sheet metal'],
  },
  {
    title: 'Electrical',
    items: ['KiCad', 'Altium', 'LTspice', 'Multimeter', 'THT Soldering', 'PCB Assembly', 'Arduino', 'STM32'],
  },
  {
    title: 'Software',
    items: ['Python', 'Java', 'C / C++', 'R'],
  },
  {
    title: 'Tools',
    items: ['MATLAB / Simulink', 'Git', 'Excel', 'Notion'],
  },
]

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-24">
      <SectionHeading index="04" title="Skills & Tools" id="skills-title" />
      <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <div key={group.title} data-reveal className="bg-background p-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm transition-transform hover:translate-x-1"
                >
                  <span className="size-1 rounded-full bg-signal" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
