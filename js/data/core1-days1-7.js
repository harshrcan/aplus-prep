/* Core 1 lessons, days 1 to 7.
   Exercises: ['m', q, opts, correctIdx, why] · ['mm', q, opts, [idx], why] · ['f', q with ___, ans|[ans], why, hint]
              ['s', prompt, [steps in correct order], why] · ['x', prompt, [[left,right]...], why] · ['t', statement, bool, why]
   cards: one per line "front | back". map: [label, small, [children]] */
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(
{
  day: 1, exam: 1, dom: '5.0', title: 'The troubleshooting method and how the exam thinks', obj: '220-1201 · 5.1 troubleshooting methodology', deck: 'd1',
  goals: ['Recite the 7 CompTIA troubleshooting steps in order', 'Pick the right step for a scenario ("what should the tech do NEXT?")', 'Know when to escalate and what to document', 'Read A+ questions the way the exam writers intend'],
  concept: `
<h3>The CompTIA troubleshooting methodology</h3>
<p>This sequence is tested directly (ordering PBQs) and indirectly (every "what should you do NEXT" question). Memorise it word for word.</p>
<tb>#;Step;What it really means
1;<b>Identify the problem</b>;Gather info from the user, identify user changes, duplicate the problem, question users, identify symptoms, determine recent changes, approach multiple problems individually. <b>Back up data before making changes</b> (where appropriate). Also check documentation and research.
2;<b>Establish a theory of probable cause</b> (question the obvious);If necessary, research externally or internally based on symptoms. Start simple: power, cables, the last thing that changed.
3;<b>Test the theory to determine the cause</b>;If confirmed, determine next steps. If not confirmed, establish a new theory or <b>escalate</b>.
4;<b>Establish a plan of action</b> to resolve the problem and implement the solution;Refer to vendor instructions for guidance. Consider corporate policies, procedures and impacts (change management).
5;<b>Implement the solution or escalate</b> as necessary;Do the fix, or hand it to someone with more access/skill.
6;<b>Verify full system functionality</b>;If applicable, implement <b>preventive measures</b>.
7;<b>Document</b> findings, actions and outcomes;Close the ticket with what was wrong, what you did, and the result.</tb>
<n>Mnemonic: <b>I</b> <b>T</b>hink <b>T</b>echs <b>E</b>njoy <b>I</b>mplementing <b>V</b>ery <b>D</b>etailed docs: Identify, Theory, Test, Establish plan, Implement, Verify, Document.</n>
<t>"Document" is always <b>last</b>. "Back up data" belongs to step 1 (before you change anything). "Preventive measures" belongs to step 6 (verify). Escalation can happen at step 3 (can't confirm theory) or step 5.</t>
<h3>Reading scenario questions</h3>
<ul>
<li><b>FIRST</b> = the least invasive, cheapest, fastest, safest action. Check the cable before replacing the motherboard. Ask the user what changed before reimaging.</li>
<li><b>NEXT</b> = locate where the tech is in the 7 steps, then pick the following step. "The tech replaced the drive" → next is verify functionality.</li>
<li><b>BEST</b> = more than one answer works, pick the one that solves the root cause with the least side effect.</li>
<li><b>Scope clues</b>: one user vs all users, one app vs every app, wired vs wireless, after an update vs suddenly.</li>
<li>Answers that involve <b>replacing hardware</b> are rarely the first step. Answers that say "reinstall the OS" are almost never first.</li>
</ul>
<h3>Professional habits the exam rewards</h3>
<ul>
<li>Question the obvious: is it plugged in, powered on, the right input selected, the caps lock on?</li>
<li>Change <b>one thing at a time</b> so you know what fixed it.</li>
<li>Duplicate the problem before you claim it's fixed, and after.</li>
<li>Follow change management in business environments: you don't push a fix to 500 PCs without approval.</li>
<li>Escalate when the problem is outside your scope, access or time limit. Escalation is not failure.</li>
</ul>
<h3>About the exam itself</h3>
<k>Core 1 (220-1201) and Core 2 (220-1202): up to 90 questions, 90 minutes each. Pass: 675 (Core 1) and 700 (Core 2) on a 100–900 scale. Core 1 weights: Mobile 13, Networking 23, Hardware 25, Virtualization/Cloud 11, HW & Network Troubleshooting 28.</k>
<p>Troubleshooting is the biggest Core 1 domain at 28%. Every hardware and networking day in this plan ends with "how does this fail and how do you fix it".</p>`,
  map: ['Troubleshooting method', '7 steps, always in order', [
    ['1 Identify', 'question user, duplicate, recent changes', [['back up data first', 'before changes'], ['one problem at a time', '']]],
    ['2 Theory', 'question the obvious', [['research', 'internal / external']]],
    ['3 Test theory', '', [['confirmed', 'determine next steps'], ['not confirmed', 'new theory or escalate']]],
    ['4 Plan of action', 'vendor docs, policy, impact', []],
    ['5 Implement', 'or escalate', []],
    ['6 Verify', 'full functionality', [['preventive measures', '']]],
    ['7 Document', 'findings, actions, outcomes', [['always last', '']]]
  ]],
  cards: `Step 1 of troubleshooting | Identify the problem (gather info, question users, duplicate, recent changes, back up data)
Step 2 of troubleshooting | Establish a theory of probable cause (question the obvious, research if needed)
Step 3 of troubleshooting | Test the theory to determine cause (if not confirmed: new theory or escalate)
Step 4 of troubleshooting | Establish a plan of action to resolve the problem and implement the solution (vendor docs, policies, impact)
Step 5 of troubleshooting | Implement the solution or escalate as necessary
Step 6 of troubleshooting | Verify full system functionality and, if applicable, implement preventive measures
Step 7 of troubleshooting | Document findings, actions and outcomes
When do you back up data? | Step 1, before making any changes
Where do preventive measures go? | Step 6, verify full system functionality
Two places you may escalate | Step 3 (theory not confirmed) and Step 5 (implement or escalate)
"FIRST" in a scenario usually means | The least invasive, cheapest, safest step
Core 1 passing score | 675 on a 100–900 scale
Core 2 passing score | 700 on a 100–900 scale
Questions / time per A+ exam | Up to 90 questions, 90 minutes`,
  ex: [
    ['s', 'Put the CompTIA troubleshooting steps in order.', ['Identify the problem', 'Establish a theory of probable cause', 'Test the theory to determine the cause', 'Establish a plan of action and implement the solution', 'Implement the solution or escalate', 'Verify full system functionality', 'Document findings, actions and outcomes'], 'Identify → Theory → Test → Plan → Implement → Verify → Document.'],
    ['m', 'A user reports their PC will not power on. What should the technician do FIRST?', ['Check that the power cable is connected and the outlet works', 'Replace the power supply', 'Reseat the RAM', 'Flash the UEFI firmware'], 'Question the obvious. Power and cables are checked before any part is replaced.'],
    ['m', 'A technician has confirmed a faulty NIC caused the outage and replaced it. What should the technician do NEXT?', ['Verify full system functionality', 'Document the findings', 'Establish a theory of probable cause', 'Escalate to the network team'], 'After implementing, the next step is <b>verify</b>. Documentation comes last.'],
    ['m', 'During testing, the technician\'s theory is NOT confirmed. What are the two valid next actions?', ['Establish a new theory or escalate', 'Implement the solution or document', 'Reimage the system or replace the drive', 'Close the ticket or call the vendor'], 'Step 3: if the theory is not confirmed, re-establish a new theory or escalate.'],
    ['m', 'At which step should a technician back up the user\'s data?', ['Identify the problem, before making changes', 'Verify functionality', 'Document findings', 'Implement the solution'], 'CompTIA places "perform backups before making changes" in step 1.'],
    ['m', 'In which step would a technician schedule a monthly disk cleanup task to stop the issue returning?', ['Verify full system functionality and implement preventive measures', 'Establish a plan of action', 'Document findings', 'Test the theory'], 'Preventive measures are part of step 6.'],
    ['mm', 'Which TWO actions belong to "Identify the problem"? (Choose two.)', ['Question the user about recent changes', 'Duplicate the problem if possible', 'Implement preventive measures', 'Refer to vendor instructions to apply a fix', 'Close the ticket'], 'Identify = gather information: question users, determine recent changes, duplicate the problem.'],
    ['m', 'A user has three unrelated issues: slow boot, a broken printer mapping and no sound. What does CompTIA recommend?', ['Approach multiple problems individually', 'Reimage the PC to fix all three at once', 'Escalate all three immediately', 'Fix the easiest one and close the ticket'], 'Step 1 includes "approach multiple problems individually".'],
    ['m', 'Before rolling a registry fix out to every PC in the finance department, the technician should:', ['Follow the change management process and consider business impact', 'Apply it immediately to all PCs', 'Ask one user if they mind', 'Skip testing because it worked once'], 'Step 4: consider corporate policies, procedures and impacts.'],
    ['f', 'The final step of the troubleshooting methodology is to ___ findings, actions and outcomes.', ['document', 'documentation'], 'Always last: <b>document</b>.', 'one verb'],
    ['f', 'Step 2: establish a theory of probable cause. CompTIA adds "question the ___".', ['obvious', 'the obvious'], 'Question the obvious: power, cables, settings, user error.'],
    ['t', 'Escalation means the technician failed and should be avoided.', false, 'Escalation is a normal, documented option in steps 3 and 5 when the issue is beyond your scope or access.'],
    ['m', 'Which answer would almost NEVER be the FIRST step in an A+ scenario?', ['Reinstall the operating system', 'Ask the user what changed', 'Check the cable', 'Restart the application'], 'OS reinstall is a last resort. The exam favours least-invasive first steps.'],
    ['x', 'Match each action to its troubleshooting step.', [['Ask the user when it last worked', 'Identify the problem'], ['Suspect a loose video cable', 'Establish a theory'], ['Swap the cable to see if it fixes it', 'Test the theory'], ['Read the vendor KB before applying firmware', 'Establish a plan of action'], ['Confirm the user can print and email', 'Verify functionality'], ['Write the fix in the ticket', 'Document']], 'Map each verb to its step: ask = identify, suspect = theory, swap to see = test, read vendor = plan, confirm works = verify, write = document.'],
    ['m', 'The CompTIA A+ Core 1 exam has a maximum of how many questions?', ['90', '75', '100', '120'], 'Up to 90 questions in 90 minutes for each core exam.'],
    ['m', 'Which Core 1 domain carries the most weight?', ['Hardware and Network Troubleshooting (28%)', 'Networking (23%)', 'Hardware (25%)', 'Mobile Devices (13%)'], 'Troubleshooting is 28%, hardware 25%, networking 23%.'],
    ['m', 'A tech fixes a printer but the user later finds scanning is broken. Which step did the tech most likely skip?', ['Verify full system functionality', 'Identify the problem', 'Document findings', 'Establish a theory'], 'Verify FULL system functionality, not just the reported symptom.']
  ]
},
{
  day: 2, exam: 1, dom: '3.0', title: 'Motherboards, CPUs, BIOS/UEFI and boot', obj: '220-1201 · 3.4 motherboards, CPUs, add-on cards · BIOS/UEFI settings', deck: 'd2',
  goals: ['Identify motherboard form factors and their slots/connectors', 'Compare CPU architectures, sockets, cores and features', 'Configure BIOS/UEFI: boot order, Secure Boot, TPM, passwords, virtualization', 'Explain the boot process and CMOS battery symptoms'],
  concept: `
<h3>Motherboard form factors</h3>
<tb>Form factor;Size;Notes
ATX;30.5 × 24.4 cm;Standard desktop, up to 7 expansion slots, 24-pin power
microATX (mATX);24.4 × 24.4 cm;Fewer slots (up to 4), fits ATX cases
Mini-ITX;17 × 17 cm;1 expansion slot, small form factor, low power
ITX family;also Nano/Pico;Embedded, thin clients</tb>
<p>Key parts: CPU socket, chipset, DIMM slots, PCIe slots (x1, x4, x8, x16), M.2 slots, SATA ports, front-panel headers (power switch, reset, LEDs, USB, audio), fan headers, CMOS battery (CR2032), 24-pin ATX and 4/8-pin CPU power connectors.</p>
<h3>Expansion buses</h3>
<tb>Bus;What to know
PCIe;Serial point-to-point lanes. x1, x4, x8, x16. Graphics cards use x16. Versions double bandwidth (3.0 ≈ 1 GB/s per lane, 4.0 ≈ 2, 5.0 ≈ 4)
PCI;Legacy parallel 32-bit bus, shared bandwidth
M.2;Small slot for SSDs (SATA or NVMe) and Wi-Fi cards. Keyed (B, M, B+M)</tb>
<n>A PCIe x1 card fits in an x16 slot. A x16 card does not fit in an x1 slot (unless the slot is open-ended).</n>
<h3>CPUs</h3>
<ul>
<li><b>x86 / x64</b> (Intel, AMD): 64-bit desktop and laptop standard. <b>ARM</b> (RISC): phones, tablets, Apple silicon, many thin laptops. Low power, high efficiency.</li>
<li><b>Cores</b> = physical processors on one chip. <b>Hyperthreading / SMT</b> = 2 threads per core. <b>Multithreading</b> lets software use them.</li>
<li><b>Virtualization support</b>: Intel VT-x, AMD-V. Must be enabled in UEFI for hypervisors.</li>
<li><b>Sockets</b>: Intel uses LGA (pins in the socket). AMD desktop uses AM5 (LGA) and earlier AM4 (PGA, pins on the CPU). Match the socket and chipset.</li>
<li>Cooling: heat sink + <b>thermal paste</b> (always reapply when reseating), fans, liquid cooling.</li>
</ul>
<h3>BIOS / UEFI</h3>
<tb>Feature;Purpose
UEFI;Modern firmware. GUI + mouse, GPT drives over 2 TB, Secure Boot, faster boot. BIOS = legacy, MBR
Boot order;Choose USB, network (PXE), SSD first
Secure Boot;Only signed bootloaders run. Blocks bootkits. Required for Windows 11
TPM;Trusted Platform Module chip (2.0 needed for Windows 11). Stores keys for BitLocker, measured boot
HSM;Hardware Security Module: external/server device for key management
Passwords;Supervisor/admin password locks settings. User/boot password required to start the PC
Fan / temps;Hardware monitoring
Virtualization;Enable VT-x / AMD-V
USB permissions;Disable USB ports or boot from USB</tb>
<k>Windows 11 needs UEFI + Secure Boot capable firmware, TPM 2.0, a supported 64-bit CPU (1 GHz, 2+ cores), 4 GB RAM, 64 GB storage.</k>
<h3>Boot process</h3>
<p>Power good signal → <b>POST</b> (power-on self-test) → firmware finds boot device → bootloader (Windows Boot Manager) → OS kernel. POST errors are shown as beep codes or on-screen messages.</p>
<t>The <b>CMOS battery</b> keeps settings and the clock when unplugged. A dying battery gives: <b>wrong date/time after power-off</b>, settings reset to default, "CMOS checksum error". Fix: replace the CR2032.</t>
<h3>Encryption in firmware</h3>
<p>BitLocker uses the TPM. If the TPM is cleared or the motherboard is replaced, BitLocker asks for the <b>recovery key</b>. Back it up first.</p>`,
  map: ['Motherboard & firmware', '', [
    ['Form factors', '', [['ATX', 'full, 7 slots'], ['microATX', 'up to 4 slots'], ['Mini-ITX', '17×17, 1 slot']]],
    ['Buses', '', [['PCIe x1/x4/x8/x16', 'GPU = x16'], ['M.2', 'SATA or NVMe SSD, Wi-Fi'], ['SATA', 'drives']]],
    ['CPU', '', [['x64 vs ARM', 'ARM = RISC, low power'], ['cores, SMT', ''], ['VT-x / AMD-V', 'enable for VMs'], ['socket must match', 'LGA / PGA']]],
    ['UEFI', '', [['Secure Boot', 'signed bootloaders'], ['TPM 2.0', 'BitLocker keys'], ['boot order', 'USB, PXE'], ['passwords', 'admin vs user']]],
    ['Boot', '', [['POST', 'beep codes'], ['CMOS battery', 'clock resets']]]
  ]],
  cards: `ATX | Standard motherboard, 12 × 9.6 in, up to 7 expansion slots
microATX | 9.6 × 9.6 in motherboard, up to 4 slots, fits ATX cases
Mini-ITX | 17 × 17 cm board, one expansion slot, small builds
PCIe x16 | Slot used by graphics cards
M.2 | Small form factor slot for SSDs (SATA or NVMe) and Wi-Fi cards
POST | Power-On Self-Test run by firmware at boot
UEFI | Modern firmware: GPT, Secure Boot, GUI, drives over 2 TB
Secure Boot | Firmware only runs signed bootloaders, blocks bootkits
TPM | Trusted Platform Module, stores crypto keys (BitLocker), 2.0 required for Windows 11
HSM | Hardware Security Module, dedicated device for key management
CMOS battery | CR2032 coin cell. Dead = time/date and settings reset
VT-x / AMD-V | CPU virtualization extensions, enable in UEFI for hypervisors
ARM | RISC CPU architecture, low power: phones, tablets, Apple silicon
Thermal paste | Fills gaps between CPU and heat sink. Reapply when reseating`,
  ex: [
    ['m', 'Every time a desktop is unplugged overnight, the date and time are wrong the next morning. What is the MOST likely cause?', ['Failing CMOS battery', 'Corrupt Windows time service', 'Faulty power supply', 'Bad RAM'], 'The CMOS battery keeps the RTC and settings when there is no AC power.'],
    ['m', 'A user wants to install Windows 11 but the PC check says TPM is missing. The board has a TPM. What should the tech do?', ['Enable the TPM (PTT/fTPM) in UEFI', 'Install a TPM driver in Windows', 'Replace the CPU', 'Convert the disk to MBR'], 'Firmware TPM (Intel PTT / AMD fTPM) is often disabled by default. Turn it on in UEFI.'],
    ['m', 'Which firmware feature prevents a bootkit from loading by checking signatures?', ['Secure Boot', 'TPM', 'Boot password', 'Fast Boot'], 'Secure Boot only allows signed bootloaders.'],
    ['m', 'A hypervisor will not start VMs, saying hardware virtualization is unavailable. FIRST step?', ['Enable VT-x / AMD-V in the BIOS/UEFI', 'Add more RAM', 'Reinstall the hypervisor', 'Replace the CPU'], 'Most CPUs support it, but it is often off in firmware.'],
    ['m', 'Which motherboard form factor has only one expansion slot?', ['Mini-ITX', 'microATX', 'ATX', 'Extended ATX'], 'Mini-ITX: 17 × 17 cm, one PCIe slot.'],
    ['m', 'Which slot would a technician use for a high-end graphics card?', ['PCIe x16', 'PCIe x1', 'M.2 key E', 'PCI'], 'GPUs use PCIe x16.'],
    ['mm', 'Which TWO are requirements for Windows 11? (Choose two.)', ['TPM 2.0', 'UEFI with Secure Boot capability', 'Legacy BIOS with MBR', '2 GB RAM', '32-bit CPU'], 'TPM 2.0, UEFI/Secure Boot capable, 4 GB RAM, 64 GB storage, 64-bit CPU.'],
    ['m', 'A technician replaced a motherboard and now BitLocker asks for a key at boot. Why?', ['The TPM holding the BitLocker key changed', 'The SSD is failing', 'Secure Boot was disabled', 'The CMOS battery is dead'], 'BitLocker keys are sealed to the TPM. New board = new TPM = recovery key needed.'],
    ['m', 'Which CPU architecture is RISC-based and common in mobile devices?', ['ARM', 'x86', 'x64', 'IA-64'], 'ARM is a reduced instruction set design known for low power use.'],
    ['f', 'The test firmware runs when a PC powers on is called ___.', ['POST', 'power-on self-test', 'power on self test'], 'POST = Power-On Self-Test. Failures produce beep codes.'],
    ['f', 'The coin cell that keeps BIOS settings is usually a ___.', ['CR2032', 'cr 2032'], 'CR2032 lithium coin cell.'],
    ['m', 'An administrator wants to stop employees changing boot order in firmware but still let the PC boot without a password. Configure:', ['A BIOS/UEFI supervisor (admin) password', 'A BIOS user (power-on) password', 'BitLocker PIN', 'Secure Boot'], 'Supervisor password locks setup. A user password would block booting.'],
    ['m', 'After reseating a CPU cooler, the PC overheats and shuts down within minutes. MOST likely cause?', ['Thermal paste was not reapplied', 'Wrong RAM speed', 'CMOS battery dead', 'PCIe card in wrong slot'], 'Always clean and reapply thermal paste when the heat sink is removed.'],
    ['x', 'Match the firmware setting to its purpose.', [['Secure Boot', 'Only signed bootloaders run'], ['TPM', 'Stores encryption keys in hardware'], ['Boot order', 'Chooses USB, PXE or disk first'], ['VT-x / AMD-V', 'Allows hardware virtualization'], ['Supervisor password', 'Locks firmware settings']], 'Know each setting by its job.'],
    ['t', 'A PCIe x1 card can be installed in a PCIe x16 slot.', true, 'Smaller cards fit in larger slots and run at their own width.'],
    ['m', 'UEFI is required to boot from a drive larger than 2 TB because it supports:', ['GPT partitioning', 'MBR partitioning', 'FAT32', 'CHS addressing'], 'MBR caps at 2 TB and 4 primary partitions. UEFI boots GPT.'],
    ['m', 'A PC beeps repeatedly at power-on and shows nothing on screen. Where is it failing?', ['POST', 'Windows Boot Manager', 'Login screen', 'Driver load'], 'Beep codes are POST errors, often RAM or video.']
  ]
},
{
  day: 3, exam: 1, dom: '3.0', title: 'RAM, storage and RAID', obj: '220-1201 · 3.2 RAM · 3.3 storage devices (incl. RAID)', deck: 'd3',
  goals: ['Choose the right RAM type, form factor and channel config', 'Compare HDD, SATA SSD and NVMe SSD and their interfaces', 'Pick a RAID level from a requirement', 'Recognise drive form factors and connectors'],
  concept: `
<h3>RAM</h3>
<tb>Item;Know this
DIMM;Desktop memory module (288-pin for DDR4 and DDR5)
SO-DIMM;Laptop / small form factor memory
DDR4 vs DDR5;Not interchangeable (different notch). DDR5 = higher speed, on-module power management, two subchannels per DIMM
ECC;Error-correcting code. Detects/corrects bit errors. Servers and workstations. Board and CPU must support it
Registered (buffered);Server RAM with a register chip for stability with many DIMMs
Channels;Single, dual, triple, quad. Install matching pairs in the colour-coded slots for dual channel
Virtual memory;Page file on disk used when RAM is full (slow)</tb>
<t>If a new RAM stick is not recognised, check: same DDR generation, seated fully (clips locked), right slots for dual channel, motherboard max capacity, and the 32-bit OS 4 GB limit.</t>
<h3>Storage drives</h3>
<tb>Type;Interface;Notes
HDD;SATA;Spinning platters. 5,400 / 7,200 / 10,000 / 15,000 rpm. Cheap per TB. Clicking = failure
SSD (2.5 in);SATA (max ~600 MB/s);No moving parts, fast random access
M.2 SATA SSD;SATA via M.2 slot;Same speed as 2.5 in SATA SSD
NVMe SSD;PCIe lanes (M.2 or add-in card);Thousands of MB/s. Needs board/slot support
mSATA;SATA;Older small SSD form factor
Flash;USB drives, SD / microSD cards;Removable
Optical;CD 700 MB · DVD 4.7 GB (8.5 dual layer) · Blu-ray 25 GB (50 dual);Legacy media</tb>
<p>Form factors: 3.5 in (desktop HDD), 2.5 in (laptop HDD/SSD), M.2 (2242, 2260, 2280 = 22 mm wide × 80 mm long).</p>
<n>An M.2 slot keyed M may support only NVMe, only SATA, or both. Check the board manual before buying an M.2 drive.</n>
<h3>RAID</h3>
<tb>Level;Min drives;How;Fault tolerance;Capacity
RAID 0;2;Striping;None. One drive fails = all data lost;100%
RAID 1;2;Mirroring;1 drive can fail;50%
RAID 5;3;Striping with distributed parity;1 drive can fail;n − 1 drives
RAID 6;4;Striping with double parity;2 drives can fail;n − 2 drives
RAID 10 (1+0);4;Stripe of mirrors;1 per mirror pair;50%</tb>
<k>RAID 0 = speed, no redundancy. RAID 1 = simple mirror. RAID 5 = best capacity with 1-drive tolerance (3+ drives). RAID 6 = 2-drive tolerance (4+). RAID 10 = speed + redundancy (4+). RAID is not a backup.</k>
<p>Hot-swappable drives can be replaced with the system running (common in servers/NAS). After replacing a failed drive, the array <b>rebuilds</b>.</p>`,
  map: ['Memory & storage', '', [
    ['RAM', '', [['DIMM / SO-DIMM', 'desktop / laptop'], ['DDR4 ≠ DDR5', 'different notch'], ['ECC', 'servers, corrects errors'], ['dual channel', 'matching pairs, coloured slots']]],
    ['Drives', '', [['HDD', 'rpm, SATA, clicking = failing'], ['SATA SSD', '~600 MB/s'], ['NVMe', 'PCIe lanes, M.2'], ['M.2 2280', '22 × 80 mm']]],
    ['RAID', 'not a backup', [['0', 'stripe, no tolerance, 2+'], ['1', 'mirror, 2'], ['5', 'parity, 3+, 1 fail'], ['6', 'double parity, 4+, 2 fail'], ['10', 'mirror + stripe, 4+']]]
  ]],
  cards: `DIMM | Desktop RAM module
SO-DIMM | Small outline DIMM, laptop RAM
ECC RAM | Error-correcting memory used in servers/workstations
Dual channel | Matching RAM pairs in paired slots for double bandwidth
NVMe | SSD protocol over PCIe lanes, far faster than SATA
SATA III max speed | 6 Gb/s (~600 MB/s)
M.2 2280 | 22 mm wide, 80 mm long M.2 card
RAID 0 | Striping, 2+ drives, no fault tolerance, fastest
RAID 1 | Mirroring, 2 drives, 50% capacity, 1 can fail
RAID 5 | Striping with parity, 3+ drives, 1 can fail
RAID 6 | Double parity, 4+ drives, 2 can fail
RAID 10 | Stripe of mirrors, 4+ drives, speed + redundancy
HDD speeds | 5,400 / 7,200 / 10,000 / 15,000 rpm
Blu-ray single layer capacity | 25 GB (dual layer 50 GB)
DVD capacity | 4.7 GB single layer, 8.5 GB dual layer
Hot-swappable | Can be replaced while the system runs`,
  ex: [
    ['m', 'A video editor needs maximum read/write speed and does not care about redundancy. Which RAID level?', ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6'], 'RAID 0 stripes for speed with zero fault tolerance.'],
    ['m', 'A small office server has three identical drives and needs fault tolerance with the most usable space. Which RAID?', ['RAID 5', 'RAID 1', 'RAID 0', 'RAID 10'], 'RAID 5 with 3 drives keeps 2 drives of capacity and survives 1 failure.'],
    ['m', 'What is the minimum number of drives for RAID 6?', ['4', '3', '2', '5'], 'RAID 6 uses double parity: minimum 4 drives, survives 2 failures.'],
    ['m', 'A NAS with four 4 TB drives in RAID 10 has how much usable space?', ['8 TB', '16 TB', '12 TB', '4 TB'], 'RAID 10 mirrors, so 50% usable: 8 TB.'],
    ['m', 'A laptop needs more memory. Which module type is MOST likely required?', ['SO-DIMM', 'DIMM', 'Registered DIMM', 'SIMM'], 'Laptops use SO-DIMMs.'],
    ['m', 'A user installed one DDR5 module in a board with DDR4 slots. It will not fit. Why?', ['DDR generations have different notch positions and are not compatible', 'The module needs a driver', 'The BIOS must be updated', 'It needs to be in slot 1'], 'DDR4 and DDR5 are keyed differently and electrically incompatible.'],
    ['m', 'Which drive interface gives the highest throughput for an internal SSD?', ['NVMe over PCIe', 'SATA III', 'eSATA', 'USB 2.0'], 'NVMe uses PCIe lanes: several GB/s vs SATA\'s ~600 MB/s.'],
    ['m', 'A new M.2 SATA SSD is not detected, but the slot works with NVMe drives. MOST likely cause?', ['The M.2 slot supports NVMe only', 'The SSD needs a SATA power cable', 'RAID must be enabled', 'Secure Boot is blocking it'], 'Many M.2 slots are NVMe-only. Check the board specs.'],
    ['mm', 'Which TWO RAID levels can survive the failure of a single drive with only 2 or 3 drives? (Choose two.)', ['RAID 1', 'RAID 5', 'RAID 0', 'RAID 6', 'RAID 10'], 'RAID 1 (2 drives) and RAID 5 (3 drives). RAID 6 and 10 need 4.'],
    ['m', 'Which type of RAM detects and corrects single-bit errors?', ['ECC', 'Non-parity', 'SO-DIMM', 'DDR5 unbuffered'], 'ECC = error-correcting code.'],
    ['m', 'An HDD makes a repeated clicking sound and the PC freezes when opening files. FIRST action?', ['Back up the data immediately', 'Defragment the drive', 'Run chkdsk /r several times', 'Update the chipset driver'], 'Clicking = mechanical failure. Get the data off before it dies.'],
    ['f', 'RAID 1 is also called disk ___.', ['mirroring', 'mirror'], 'RAID 1 writes identical data to two drives.'],
    ['f', 'An M.2 2280 SSD is 22 mm wide and ___ mm long.', ['80'], 'The last digits are the length.'],
    ['x', 'Match the RAID level to the description.', [['RAID 0', 'Striping, no fault tolerance'], ['RAID 1', 'Mirroring, two drives'], ['RAID 5', 'Distributed parity, 3+ drives'], ['RAID 6', 'Double parity, survives two failures'], ['RAID 10', 'Striped mirrors, 4+ drives']], 'Core RAID facts.'],
    ['t', 'RAID 1 removes the need for backups because data is copied to two drives.', false, 'RAID protects against drive failure, not deletion, ransomware or corruption. RAID is not a backup.'],
    ['m', 'Two 8 GB DIMMs show only single-channel mode. MOST likely cause?', ['They are in the same channel instead of matching colour-coded slots', 'ECC is disabled', 'The page file is too small', 'They are SO-DIMMs'], 'Use the slots the manual specifies (often slots 2 and 4) for dual channel.'],
    ['m', 'Which optical disc holds 25 GB on a single layer?', ['Blu-ray', 'DVD', 'CD', 'DVD dual layer'], 'Blu-ray 25 GB, DVD 4.7 GB, CD 700 MB.']
  ]
},
{
  day: 4, exam: 1, dom: '3.0', title: 'Power supplies, cooling, add-on cards and custom builds', obj: '220-1201 · 3.5 power supplies · 3.4 cooling and add-on cards · 3.6 build to requirements', deck: 'd4',
  goals: ['Select a PSU by wattage, connectors and input voltage', 'Explain redundant and modular power supplies', 'Choose cooling and expansion cards for a build', 'Match workstation components to user requirements'],
  concept: `
<h3>Power supply units</h3>
<tb>Item;Know this
Input;110–120 V or 220–240 V AC. Older PSUs have a voltage switch. Most are auto-sensing
Output rails;+3.3 V, +5 V, +12 V DC (12 V powers CPU, GPU, fans, drives)
24-pin ATX;Motherboard main power (20+4)
4/8-pin EPS/ATX12V;CPU power
6/8-pin PCIe (and 12VHPWR / 12V-2x6 16-pin);Graphics card power
SATA power;15-pin, drives
Molex;4-pin legacy peripheral power
Wattage;Add up components + headroom (20–30%). GPUs draw the most
Efficiency;80 PLUS ratings (Bronze, Gold, Platinum, Titanium)
Modular;Detachable cables: less clutter, better airflow
Redundant;Two hot-swap PSUs in servers. One fails, the other carries the load</tb>
<t>Never open a power supply. Capacitors hold a charge after it is unplugged. Replace, don't repair.</t>
<n>Symptoms of a failing PSU: random reboots, no power at all, burning smell, fans spin but no POST, and grinding PSU fan. Test with a <b>PSU tester</b> or multimeter.</n>
<h3>Cooling</h3>
<p>Fans (case intake front, exhaust rear/top), heat sinks, thermal paste and thermal pads, liquid cooling (pump, radiator, tubing). Keep vents clean with compressed air. Overheating = shutdowns, throttling, loud fans.</p>
<h3>Add-on cards</h3>
<tb>Card;Use
Video (GPU);Dedicated graphics memory, multiple displays, gaming/CAD
Sound card;Higher quality audio, more ports
Capture card;Records video input (streaming, cameras)
NIC;Extra / faster network ports, fibre (SFP)
Wi-Fi card;Wireless on desktops (PCIe or M.2)
Storage / RAID controller (HBA);More SATA/SAS ports, hardware RAID</tb>
<h3>Building to requirements (3.6 style)</h3>
<tb>Workstation;Prioritise
Graphic design / CAD / video editing;Multicore CPU, high-end GPU, max RAM, fast NVMe, high-res calibrated monitor
Gaming;High-end GPU, fast CPU, high refresh rate display, good cooling
Virtualization host;Max cores, max RAM, VT-x/AMD-V, fast storage
Thin client;Minimal hardware, network connectivity, runs remote desktop / VDI
Thick client (standard office);Meets OS requirements, desktop apps
Network-attached storage (NAS);RAID, multiple drives, Gigabit+ NIC, file sharing
Home theater / media PC;Quiet, small form factor, HDMI, surround sound, TV tuner/streaming</tb>`,
  map: ['Power, cooling, builds', '', [
    ['PSU', '', [['input 120/240 V', 'auto-sensing'], ['24-pin, 8-pin CPU, PCIe, SATA', 'connectors'], ['wattage + headroom', 'GPU biggest'], ['modular / redundant', ''], ['never open', 'capacitors']]],
    ['Cooling', '', [['fans, heat sink, paste', ''], ['liquid', 'pump + radiator']]],
    ['Cards', '', [['GPU, sound, capture', ''], ['NIC, Wi-Fi', ''], ['RAID/HBA', '']]],
    ['Builds', '', [['CAD/video', 'GPU, RAM, cores'], ['virtualization', 'cores, RAM, VT-x'], ['thin client', 'minimal, network'], ['NAS', 'RAID, NIC']]]
  ]],
  cards: `24-pin ATX connector | Main motherboard power
4/8-pin ATX12V/EPS | CPU power connector
6/8-pin PCIe | Graphics card power (newer: 16-pin 12V-2x6)
15-pin SATA power | Drive power connector
Molex | 4-pin legacy peripheral power connector
PSU output voltages | +3.3 V, +5 V, +12 V DC
Modular PSU | Detachable cables for better airflow and less clutter
Redundant PSU | Two hot-swap supplies, one takes over if the other fails
80 PLUS | PSU efficiency certification (Bronze to Titanium)
Capture card | Expansion card that records incoming video
Thin client | Minimal PC that relies on a server (VDI / remote desktop)
Virtualization workstation needs | Many cores, lots of RAM, VT-x/AMD-V enabled
PSU tester | Tool that checks PSU output voltages`,
  ex: [
    ['m', 'A user adds a powerful graphics card and the PC now shuts down during games. MOST likely cause?', ['Insufficient PSU wattage', 'Bad CMOS battery', 'Wrong DNS server', 'Corrupt GPU driver'], 'High-end GPUs draw a lot of power. Size the PSU with headroom.'],
    ['m', 'Which connector supplies power to the CPU?', ['4/8-pin ATX12V (EPS)', '24-pin ATX', '6-pin PCIe', '15-pin SATA'], 'CPU = 4 or 8-pin. Motherboard main = 24-pin.'],
    ['m', 'Which PSU feature keeps a server running if one supply fails?', ['Redundant power supplies', 'Modular cabling', '80 PLUS Gold', 'Auto-sensing input'], 'Redundant hot-swap PSUs share the load.'],
    ['m', 'A PSU smells like burning and the PC will not power on. What should the technician do?', ['Replace the PSU', 'Open the PSU and replace the capacitor', 'Flip the voltage switch', 'Reset the CMOS'], 'PSUs are replaced, never opened.'],
    ['m', 'A graphic designer needs a new workstation. Which component should get the biggest budget share?', ['A high-end GPU and lots of RAM', 'A sound card', 'A second optical drive', 'An integrated graphics CPU'], 'Design/CAD/video = GPU, RAM, multicore CPU, colour-accurate monitor.'],
    ['m', 'A company wants cheap desktops that only connect to a virtual desktop infrastructure. Which build?', ['Thin client', 'Gaming PC', 'Virtualization workstation', 'NAS'], 'Thin clients have minimal hardware and rely on the server.'],
    ['mm', 'Which TWO are MOST important for a workstation that will run several virtual machines? (Choose two.)', ['Maximum RAM', 'CPU with many cores and virtualization support', 'High-end sound card', 'Blu-ray burner', 'Large monitor'], 'VMs need RAM and CPU cores (with VT-x / AMD-V).'],
    ['m', 'Which voltage rail powers most modern CPUs and GPUs?', ['+12 V', '+3.3 V', '+5 V', '−12 V'], '12 V carries the heavy loads.'],
    ['m', 'Which tool confirms a PSU is outputting the correct voltages?', ['PSU tester or multimeter', 'Loopback plug', 'Cable tester', 'Tone generator'], 'A PSU tester plugs into the connectors and reads each rail.'],
    ['f', 'A power supply with detachable cables is called ___.', ['modular', 'a modular psu', 'modular psu'], 'Modular PSUs improve airflow and cable management.'],
    ['f', 'Drives receive power through a 15-pin ___ power connector.', ['SATA'], 'SATA power is 15-pin, SATA data is 7-pin.'],
    ['m', 'A streamer wants to record a gaming console\'s HDMI output on a PC. Install a:', ['Capture card', 'Sound card', 'NIC', 'RAID controller'], 'Capture cards take external video input.'],
    ['x', 'Match each user to the build priority.', [['Video editor', 'Multicore CPU, GPU, max RAM'], ['Home file server', 'RAID drives and Gigabit NIC'], ['Call-centre VDI user', 'Thin client'], ['Gamer', 'High-end GPU and high refresh display'], ['Lab running VMs', 'Cores, RAM, VT-x enabled']], 'Workstation requirements are classic matching PBQs.'],
    ['t', 'A modern auto-sensing PSU can accept both 120 V and 240 V input without a switch.', true, 'Most current PSUs are auto-sensing (active PFC).'],
    ['m', 'A PC randomly reboots under load. Temperatures are normal and RAM tests pass. What is the BEST next component to test?', ['Power supply', 'Monitor', 'Keyboard', 'Optical drive'], 'Random reboots under load point to the PSU once heat and RAM are ruled out.'],
    ['m', 'Which part connects many extra SATA/SAS drives and can provide hardware RAID?', ['Storage controller / HBA card', 'Capture card', 'Sound card', 'Riser card for Wi-Fi'], 'HBA / RAID controller cards add drive ports.']
  ]
},
{
  day: 5, exam: 1, dom: '3.0', title: 'Cables, connectors, peripherals and displays', obj: '220-1201 · 3.1 display components · 3.2 cables and connectors · peripherals', deck: 'd5',
  goals: ['Identify video, USB, network, storage and legacy connectors', 'Know USB versions, speeds and Thunderbolt', 'Compare LCD (IPS, TN, VA), OLED and mini-LED displays', 'Explain resolution, refresh rate, brightness and touch/digitizer'],
  concept: `
<h3>Video connectors</h3>
<tb>Connector;Signal;Notes
HDMI;Digital audio + video;TVs, monitors. HDMI 2.1 up to 4K at 120 Hz / 8K
DisplayPort;Digital audio + video;PCs, daisy-chaining (MST). Mini DP on older Macs
DVI;Digital (DVI-D) or analog (DVI-A) or both (DVI-I);Legacy, no audio by default
VGA (DB-15);Analog;Blue 15-pin legacy. Quality drops at high resolution
USB-C;Can carry DisplayPort (Alt Mode) and Thunderbolt;One cable for video, data, power</tb>
<h3>USB</h3>
<tb>Version;Name;Speed
USB 2.0;Hi-Speed;480 Mb/s
USB 3.2 Gen 1 (USB 3.0);SuperSpeed 5 Gbps;5 Gb/s (blue port)
USB 3.2 Gen 2;SuperSpeed 10 Gbps;10 Gb/s
USB 3.2 Gen 2x2;SuperSpeed 20 Gbps;20 Gb/s
USB4;;20–40 Gb/s (USB4 v2 up to 80)
Thunderbolt 3/4;USB-C connector;40 Gb/s, PCIe + DisplayPort, daisy chain, power</tb>
<p>Connectors: USB-A, USB-B (printers), Mini-USB, Micro-USB, USB-C (reversible). Lightning = Apple's older proprietary connector. USB 2.0 max cable length ≈ 5 m.</p>
<h3>Network and other cables</h3>
<tb>Cable;Connector;Use
Twisted pair (Cat 5e/6/6a/7/8);RJ45;Ethernet
Telephone;RJ11;DSL, phone lines
Coaxial;F-type (cable internet/TV), BNC (legacy);RG-6 for cable modems
Fibre;LC, SC, ST;Long distance, immune to EMI
SATA / eSATA;7-pin data;Internal / external drives
Serial;DB-9;Console ports, legacy devices
Molex;4-pin;Legacy power</tb>
<n>Adapters: DVI-to-HDMI, USB-to-Ethernet dongle, HDMI-to-VGA (needs an active converter because it changes digital to analog).</n>
<h3>Displays</h3>
<tb>Type;Notes
LCD TN;Fast response, cheap, poor viewing angles and colour
LCD IPS;Best colour and viewing angles. Designers
LCD VA;Good contrast, between TN and IPS
LED-backlit LCD / mini-LED;LCD lit by LEDs. Mini-LED = many tiny dimming zones
OLED;Each pixel lights itself. True blacks, thin, can burn in. No backlight
Touch screen / digitizer;Layer that senses finger or stylus input. Can be recalibrated</tb>
<p>Attributes: <b>resolution</b> (1080p = 1920×1080, 1440p, 4K = 3840×2160), <b>refresh rate</b> (Hz, 60/120/144+), <b>pixel density</b>, <b>brightness</b> (nits), <b>colour gamut</b>, <b>aspect ratio</b> (16:9, 16:10, 21:9).</p>
<t>A dim LCD image that is visible with a flashlight = failed <b>backlight</b> (or inverter on old CCFL laptops). OLED has no backlight.</t>
<h3>Peripherals</h3>
<p>Input: keyboard, mouse, touchpad, webcam, microphone, scanner, barcode/QR scanner, KVM switch (one keyboard/video/mouse for several PCs), signature pad, game controllers. Output: monitors, speakers, headsets, projectors (lumens, keystone correction).</p>`,
  map: ['Cables & displays', '', [
    ['Video', '', [['HDMI', 'digital A/V, TVs'], ['DisplayPort', 'PCs, daisy-chain'], ['DVI', 'D / A / I'], ['VGA', 'analog DB-15'], ['USB-C Alt Mode', '']]],
    ['USB', '', [['2.0', '480 Mb/s'], ['3.2 Gen 1', '5 Gb/s'], ['3.2 Gen 2', '10 Gb/s'], ['USB4 / TB', '40 Gb/s']]],
    ['Network', '', [['RJ45', 'Ethernet'], ['RJ11', 'phone/DSL'], ['F-type', 'coax cable modem'], ['LC/SC/ST', 'fibre']]],
    ['Displays', '', [['TN', 'fast, poor angles'], ['IPS', 'best colour'], ['VA', 'contrast'], ['OLED', 'self-lit, burn-in'], ['backlight', 'dim = flashlight test']]]
  ]],
  cards: `HDMI | Digital audio + video connector for TVs and monitors
DisplayPort | Digital A/V connector, supports daisy-chaining (MST)
DVI-I | DVI carrying both digital and analog signals
VGA | Analog DB-15 video connector (blue)
USB 2.0 speed | 480 Mb/s
USB 3.2 Gen 1 speed | 5 Gb/s (formerly USB 3.0)
USB 3.2 Gen 2 speed | 10 Gb/s
Thunderbolt 3/4 | 40 Gb/s over USB-C, carries PCIe + DisplayPort
RJ45 | 8-pin Ethernet connector
RJ11 | Telephone / DSL connector
F-type | Coaxial connector for cable modems and TV
LC, SC, ST | Fibre optic connectors
IPS | LCD panel with best colour accuracy and viewing angles
TN | LCD panel with fast response but poor angles and colour
OLED | Self-emissive pixels, true black, no backlight, can burn in
KVM switch | Share one keyboard, video and mouse across multiple computers
Digitizer | Touch-sensing layer on a screen
DB-9 | 9-pin serial connector`,
  ex: [
    ['m', 'A user needs to connect a laptop to a TV and carry audio over the same cable. Which connector is BEST?', ['HDMI', 'VGA', 'DVI-D', 'DB-9'], 'HDMI carries digital audio and video. VGA and DVI do not carry audio.'],
    ['m', 'A graphic designer wants the best colour accuracy and viewing angles. Which LCD panel?', ['IPS', 'TN', 'VA', 'CCFL'], 'IPS = best colour and angles.'],
    ['m', 'A laptop screen is very dim, but the image is visible when a flashlight is shone on it. MOST likely cause?', ['Failed backlight', 'Bad GPU driver', 'Dead pixels', 'Wrong resolution'], 'Faint image visible with light = no backlight.'],
    ['m', 'What is the maximum speed of USB 3.2 Gen 2?', ['10 Gb/s', '5 Gb/s', '480 Mb/s', '40 Gb/s'], 'Gen 1 = 5, Gen 2 = 10, Gen 2x2 = 20.'],
    ['m', 'Which connector is used by a cable modem\'s coaxial line?', ['F-type', 'RJ45', 'RJ11', 'LC'], 'Coax for cable internet uses F-type.'],
    ['m', 'Which interface carries PCIe data, DisplayPort video and power over a USB-C connector at 40 Gb/s?', ['Thunderbolt', 'USB 2.0', 'eSATA', 'HDMI'], 'Thunderbolt 3/4 use the USB-C connector.'],
    ['m', 'A user wants one keyboard, mouse and monitor to control two desktops. Install a:', ['KVM switch', 'USB hub', 'Docking station', 'Port replicator'], 'KVM = keyboard, video, mouse switch.'],
    ['mm', 'Which TWO video connectors are digital and can carry audio? (Choose two.)', ['HDMI', 'DisplayPort', 'VGA', 'DVI-A', 'S-Video'], 'HDMI and DisplayPort carry digital audio. VGA and DVI-A are analog.'],
    ['m', 'Which display technology does NOT need a backlight?', ['OLED', 'IPS LCD', 'TN LCD', 'Mini-LED LCD'], 'OLED pixels emit their own light.'],
    ['m', 'Connecting an HDMI laptop to an old VGA projector requires:', ['An active HDMI-to-VGA converter', 'A passive HDMI-to-DVI cable', 'A straight-through Ethernet cable', 'A USB 2.0 hub'], 'Digital to analog needs an active converter.'],
    ['f', 'USB 2.0 runs at ___ Mb/s.', ['480'], 'USB 2.0 Hi-Speed = 480 Mb/s.'],
    ['f', 'Telephone and DSL lines use the ___ connector.', ['RJ11', 'rj-11'], 'RJ11 (smaller than RJ45).'],
    ['x', 'Match the connector to its use.', [['RJ45', 'Ethernet'], ['LC', 'Fibre optic'], ['DB-9', 'Serial / console'], ['F-type', 'Coaxial cable internet'], ['DB-15', 'VGA video']], 'Connector identification is very common on Core 1.'],
    ['m', 'Touch input on a tablet is offset from where the user taps. FIRST step?', ['Recalibrate the digitizer / touch screen', 'Replace the LCD', 'Factory reset the device', 'Update the BIOS'], 'Calibration fixes misaligned touch before any hardware swap.'],
    ['t', 'TN panels are chosen for their excellent viewing angles.', false, 'TN is fast and cheap but has the worst viewing angles. IPS has the best.'],
    ['m', 'A gamer complains of motion blur. Which monitor spec matters MOST?', ['Refresh rate (and response time)', 'Colour gamut', 'Aspect ratio', 'Number of USB ports'], 'Higher Hz and lower response time reduce blur.'],
    ['m', 'Which resolution is 4K UHD?', ['3840 × 2160', '1920 × 1080', '2560 × 1440', '1280 × 720'], '4K UHD = 3840 × 2160.']
  ]
},
{
  day: 6, exam: 1, dom: '3.0', title: 'Printers and multifunction devices', obj: '220-1201 · 3.7 printer deployment · 3.8 printer types and maintenance · 5.x printer troubleshooting', deck: 'd6',
  goals: ['Explain the 7-step laser printing process', 'Compare laser, inkjet, thermal and impact printers and their maintenance', 'Install, share and secure printers and MFDs', 'Fix the classic printer symptoms'],
  concept: `
<h3>Laser printing process (order matters)</h3>
<tb>#;Step;What happens
1;Processing;Page is rendered into a raster image in printer memory
2;Charging;Primary charge roller (or corona) puts a uniform negative charge on the imaging drum
3;Exposing;Laser discharges the areas where the image should be
4;Developing;Toner sticks to the discharged areas of the drum
5;Transferring;Transfer roller/belt pulls toner from drum onto paper
6;Fusing;Fuser heats and presses toner to melt it into the paper
7;Cleaning;Blade removes leftover toner, drum is discharged</tb>
<n>Mnemonic: <b>P</b>lease <b>C</b>harge <b>E</b>very <b>D</b>ay <b>T</b>o <b>F</b>ully <b>C</b>harge: Processing, Charging, Exposing, Developing, Transferring, Fusing, Cleaning.</n>
<p>Laser parts: imaging drum, fuser assembly, transfer belt/roller, pickup rollers, separation pad, duplexing assembly. Maintenance kit = fuser, rollers, pads (replace at page count, then reset the counter). Toner is a fine powder: clean with a toner vacuum, not a normal vacuum.</p>
<h3>Other printer types</h3>
<tb>Type;How;Maintenance / notes
Inkjet;Ink cartridges, print head sprays droplets;Clean heads, calibrate/align, replace cartridges. Streaks = clogged nozzles
Thermal;Heat-sensitive paper (direct) or ribbon;Receipts, labels. Replace paper, clean heating element with isopropyl alcohol. Faded print = heat element or paper
Impact (dot matrix);Pins strike an inked ribbon;Multipart forms / carbon copies. Replace ribbon, print head. Tractor-feed paper
3D;Filament (FDM) or resin;Extruder, heated bed, filament</tb>
<h3>Deployment and configuration</h3>
<ul>
<li>Connections: USB, Ethernet (wired), Wi-Fi, Bluetooth. Network printers get a <b>static IP or DHCP reservation</b>.</li>
<li>Drivers: <b>PCL</b> (fast, Windows) vs <b>PostScript</b> (device-independent, graphics). Use 64-bit drivers for 64-bit OS.</li>
<li>Settings: duplex, orientation, tray switching, quality, collate.</li>
<li>Sharing: shared via a Windows PC/print server, or printed directly (TCP/IP port 9100, IPP, AirPrint, Mopria). Cloud printing via the vendor or Microsoft Universal Print.</li>
<li>Security: <b>user authentication / badging</b> (release on swipe), secured prints with PIN, audit logs, disabling unused protocols, hard drive in MFD should be wiped before disposal.</li>
<li>Scan services: scan to email (SMTP), scan to folder (SMB share), scan to cloud. ADF = automatic document feeder, flatbed.</li>
</ul>
<h3>Troubleshooting symptoms</h3>
<tb>Symptom;Likely cause
Toner smears / rubs off;Fuser not hot enough or failing
Ghost images (repeat image);Drum or cleaning blade issue
Vertical lines / streaks (laser);Scratched drum or dirty roller
Faded print;Low toner/ink, or economy mode
Speckled pages;Toner leak or dirty interior
Paper jams;Worn pickup rollers, wrong paper type, separation pad
Multiple pages fed;Separation pad worn, humid paper
Garbled characters;Wrong or corrupt driver
Jobs stuck in queue;Restart the Print Spooler service, clear the queue
Creased paper;Feed path obstruction or paper type
Grinding noise;Gear / fuser / motor issue</tb>
<t>Garbage characters = <b>driver</b>. Toner not fused = <b>fuser</b>. Pages stuck in queue for everyone = <b>print spooler</b>. Lines/ghosting = <b>drum</b>.</t>`,
  map: ['Printers', '', [
    ['Laser 7 steps', '', [['Processing', ''], ['Charging', 'drum negative'], ['Exposing', 'laser'], ['Developing', 'toner on drum'], ['Transferring', 'to paper'], ['Fusing', 'heat + pressure'], ['Cleaning', 'blade']]],
    ['Types', '', [['Inkjet', 'heads, cartridges'], ['Thermal', 'receipts, heat element'], ['Impact', 'multipart forms, ribbon'], ['3D', 'filament']]],
    ['Deploy', '', [['static IP / reservation', ''], ['PCL vs PostScript', ''], ['badging, secure PIN', ''], ['scan to email/folder', 'SMTP / SMB']]],
    ['Symptoms', '', [['smears', 'fuser'], ['ghosting / lines', 'drum'], ['garbled', 'driver'], ['stuck queue', 'spooler'], ['jams', 'pickup rollers']]]
  ]],
  cards: `Laser step 1 | Processing (raster image created)
Laser step 2 | Charging (drum gets uniform negative charge)
Laser step 3 | Exposing (laser writes image on drum)
Laser step 4 | Developing (toner sticks to drum)
Laser step 5 | Transferring (toner moves to paper)
Laser step 6 | Fusing (heat and pressure bond toner)
Laser step 7 | Cleaning (blade removes excess toner)
Toner smears off the page | Fuser problem
Ghost images | Imaging drum / cleaning issue
Garbled characters on printout | Wrong or corrupt printer driver
Jobs stuck in the queue | Restart the Print Spooler service
Paper jams / no pickup | Worn pickup rollers
Impact printer use | Multipart forms (carbon copies)
Thermal printer cleaning | Isopropyl alcohol on the heating element
Maintenance kit (laser) | Fuser, rollers, pads. Reset the page counter after
PCL vs PostScript | PCL = fast Windows driver. PostScript = device-independent, graphics
Port 9100 | Raw TCP/IP printing (JetDirect)`,
  ex: [
    ['s', 'Put the laser printing process in order.', ['Processing', 'Charging', 'Exposing', 'Developing', 'Transferring', 'Fusing', 'Cleaning'], 'Please Charge Every Day To Fully Charge.'],
    ['m', 'Printed pages smear when touched. Which part should be replaced?', ['Fuser assembly', 'Imaging drum', 'Pickup roller', 'Transfer belt'], 'The fuser melts toner into the paper. Smudging = fuser.'],
    ['m', 'Users see faint copies of the previous page on new prints. MOST likely cause?', ['Imaging drum / cleaning blade', 'Fuser temperature too high', 'Wrong driver', 'Low network bandwidth'], 'Ghost images come from the drum not being cleaned or discharged.'],
    ['m', 'A printer outputs pages of random symbols. FIRST thing to check?', ['The printer driver', 'The toner cartridge', 'The fuser', 'The paper tray'], 'Garbled output = incorrect or corrupt driver.'],
    ['m', 'No one can print and jobs are stuck in the Windows queue. What should the technician do FIRST?', ['Restart the Print Spooler service and clear the queue', 'Replace the printer', 'Reinstall Windows', 'Swap the toner'], 'The spooler manages queued jobs. Restarting it clears stuck jobs.'],
    ['m', 'A pharmacy needs to print multipart carbon-copy forms. Which printer type?', ['Impact (dot matrix)', 'Thermal', 'Inkjet', 'Laser'], 'Only impact printers press through multiple layers.'],
    ['m', 'Receipts from a point-of-sale printer are fading. Which printer type is it and what is the fix?', ['Thermal: clean the heating element / replace paper', 'Inkjet: align the heads', 'Laser: replace the drum', 'Impact: replace the fuser'], 'POS receipt printers are thermal.'],
    ['m', 'A laser printer frequently pulls no paper or misfeeds. Replace the:', ['Pickup rollers', 'Fuser', 'Drum', 'Toner'], 'Worn rubber pickup rollers cause jams and misfeeds.'],
    ['mm', 'Which TWO steps should be taken after installing a laser printer maintenance kit? (Choose two.)', ['Reset the page/maintenance counter', 'Print a test page', 'Replace the network cable', 'Update the router firmware', 'Uninstall the driver'], 'Reset the counter so the reminder stops, and verify with a test page.'],
    ['m', 'To make sure a network printer always has the same address while DHCP stays in use, configure:', ['A DHCP reservation', 'APIPA', 'A dynamic lease', 'A DNS CNAME only'], 'Reservations map the printer MAC to a fixed IP.'],
    ['m', 'A company wants confidential prints released only when the employee is at the printer. Implement:', ['Badge / PIN secured print release', 'Duplex printing', 'Larger paper trays', 'Port 9100 printing'], 'User authentication on the device holds jobs until release.'],
    ['f', 'In the laser process, the step that uses heat and pressure is ___.', ['fusing', 'fuse'], 'Fusing melts toner into the paper.'],
    ['f', 'An inkjet prints with missing lines. The first maintenance step is to clean the print ___.', ['head', 'heads', 'printhead'], 'Clogged nozzles: run head cleaning, then alignment.'],
    ['x', 'Match the symptom to the most likely cause.', [['Toner rubs off', 'Fuser'], ['Repeated faint image', 'Drum'], ['Random characters', 'Driver'], ['Queue frozen for all users', 'Print spooler'], ['Several sheets feed at once', 'Separation pad']], 'Classic printer troubleshooting pairs.'],
    ['m', 'Which MFD feature lets a scanned document go straight into a shared network folder?', ['Scan to SMB folder', 'Scan to SMTP', 'PCL driver', 'Duplexer'], 'Scan to folder uses an SMB share. Scan to email uses SMTP.'],
    ['t', 'A standard household vacuum is safe for cleaning spilled toner.', false, 'Toner particles pass through normal filters and can ignite. Use a toner (ESD-safe, fine-filter) vacuum.'],
    ['m', 'Before an office MFD is returned at end of lease, what should be done?', ['Wipe its internal hard drive / storage', 'Remove the toner only', 'Reset the date and time', 'Update the driver on all PCs'], 'MFDs store copies of scanned and printed documents.']
  ]
},
{
  day: 7, exam: 1, dom: '1.0', title: 'Mobile devices: laptops, phones and accessories', obj: '220-1201 · 1.1 laptop hardware · 1.2 mobile display · 1.3 accessories and ports · 1.4 network connectivity and app support', deck: 'd7', mock: 'c1check',
  goals: ['Replace laptop components safely', 'Identify mobile display parts and the Wi-Fi antenna location', 'Connect accessories: docks, Bluetooth, NFC, hotspot', 'Configure mobile email, sync and MDM'],
  concept: `
<h3>Laptop hardware replacement</h3>
<ul>
<li>Commonly replaced: <b>battery</b>, <b>keyboard/keys</b>, <b>RAM (SO-DIMM)</b>, <b>storage</b> (2.5 in, M.2), wireless card, speakers, screen, DC jack, system board, touchpad. Biometric readers and NFC modules too.</li>
<li>Before opening: power off, unplug, <b>remove the battery</b>, use ESD protection, follow the manufacturer's service manual, document and organise screws.</li>
<li>Many modern laptops have soldered RAM and storage. Check before ordering parts.</li>
<li>Swollen battery = stop using, do not puncture, replace and dispose of as hazardous waste.</li>
</ul>
<h3>Mobile display components</h3>
<tb>Part;Note
LCD / OLED panel;The display itself
Backlight;LEDs behind an LCD (older laptops: CCFL + inverter)
Digitizer;Touch layer (touch/pen input)
Wi-Fi antenna;Runs <b>around the display bezel</b>, connects to the wireless card. Poor Wi-Fi after screen replacement = antenna cable not reconnected
Webcam + microphone;In the top bezel</tb>
<h3>Ports and accessories</h3>
<tb>Item;Use
Docking station;Proprietary or USB-C/Thunderbolt. Adds monitors, Ethernet, USB, charging
Port replicator;Simpler: duplicates ports
USB-C / Lightning / Micro-USB;Charging and data
Bluetooth;Short range (~10 m) PAN. Pair: enable, discoverable, select, enter PIN, test
NFC;Very short range (cm). Tap-to-pay, pairing
Hotspot / tethering;Share cellular data over Wi-Fi, USB or Bluetooth
Touch pen / stylus, headsets, speakers, webcam, trackpad;Accessories</tb>
<h3>Mobile connectivity and app support</h3>
<ul>
<li><b>Cellular</b>: 4G LTE, 5G. Data can be disabled to avoid roaming charges. Airplane mode turns off radios.</li>
<li><b>Location services</b>: GPS (satellite) plus cellular/Wi-Fi location.</li>
<li><b>MDM / MAM</b>: mobile device management enrols devices, pushes policies (passcode, encryption), remote wipe, app deployment. MAM manages just the corporate apps (good for BYOD).</li>
<li><b>Sync</b>: email, contacts, calendar, photos to cloud (iCloud, Google, Microsoft 365). Exchange ActiveSync syncs corporate mail/calendar.</li>
<li><b>Email setup</b>: Exchange/Microsoft 365, IMAP (port 143 / 993 secure), POP3 (110 / 995), SMTP to send (25, 587). Corporate vs personal accounts.</li>
<li>Second-factor apps (authenticator), carrier settings updates, PRL/firmware updates.</li>
</ul>
<k>Wi-Fi drops after a laptop screen repair → reconnect the antenna leads. Laptop runs only on AC → battery or DC jack. Keyboard types numbers instead of letters → Num Lock / Fn lock.</k>`,
  map: ['Mobile devices', '', [
    ['Laptop repair', '', [['remove battery first', ''], ['service manual', 'organise screws'], ['SO-DIMM, M.2', ''], ['soldered parts', 'check first'], ['swollen battery', 'stop, replace']]],
    ['Display', '', [['panel', 'LCD/OLED'], ['backlight', ''], ['digitizer', 'touch'], ['Wi-Fi antenna', 'in the bezel'], ['webcam/mic', '']]],
    ['Accessories', '', [['dock / port replicator', ''], ['Bluetooth', 'pair steps'], ['NFC', 'tap'], ['hotspot', 'tethering']]],
    ['Connectivity', '', [['MDM / MAM', 'policy, wipe'], ['sync', 'ActiveSync, cloud'], ['email ports', 'IMAP 993, POP 995, SMTP 587']]]
  ]],
  cards: `Wi-Fi antenna location in a laptop | Around the display bezel
Digitizer | Touch-sensing layer of a screen
Port replicator | Duplicates laptop ports, simpler than a dock
Docking station | Adds monitors, network, USB and power to a laptop
NFC | Near field communication, a few cm, tap-to-pay and pairing
Bluetooth range (class 2) | About 10 m
Tethering / hotspot | Sharing a phone's cellular data with other devices
MDM | Mobile Device Management: enrol, enforce policies, remote wipe
MAM | Mobile Application Management: manages only corporate apps
Exchange ActiveSync | Syncs corporate email, contacts, calendar to mobiles
IMAP ports | 143 (993 over SSL/TLS)
POP3 ports | 110 (995 over SSL/TLS)
SMTP submission port | 587 (25 server-to-server)
Swollen battery | Stop using, don't puncture, replace, dispose as hazardous
First step before opening a laptop | Power off, unplug and remove the battery`,
  ex: [
    ['m', 'After replacing a laptop screen, Wi-Fi signal is very weak. MOST likely cause?', ['The Wi-Fi antenna leads were not reconnected', 'The wireless driver is outdated', 'The router is failing', 'The battery is low'], 'Wi-Fi antennas run through the display bezel.'],
    ['m', 'Before replacing laptop RAM, the technician should FIRST:', ['Power off, unplug and remove the battery', 'Update the BIOS', 'Run Windows Update', 'Remove the keyboard'], 'Remove all power sources and use ESD protection.'],
    ['m', 'A laptop battery is visibly swollen and lifting the touchpad. What should the technician do?', ['Stop using it, remove it carefully and dispose of it per hazardous waste rules', 'Press the case back down', 'Drain the battery fully then recharge', 'Puncture it to release gas'], 'Swollen lithium batteries are a fire risk.'],
    ['m', 'A sales team wants to share a phone\'s cellular data with their laptop. Which feature?', ['Hotspot / tethering', 'NFC', 'Airplane mode', 'Location services'], 'Tethering shares mobile data over Wi-Fi, USB or Bluetooth.'],
    ['m', 'A company lets staff use personal phones but must be able to wipe only corporate data. Best solution?', ['MAM (mobile application management)', 'Full-device factory reset', 'Disable Bluetooth', 'Use POP3 email'], 'MAM manages and wipes corporate apps without touching personal data.'],
    ['m', 'Which technology is used for tap-to-pay at a store?', ['NFC', 'Bluetooth', 'Infrared', 'Wi-Fi Direct'], 'NFC works at a few centimetres.'],
    ['s', 'Order the steps to pair a Bluetooth headset.', ['Enable Bluetooth on the phone', 'Put the headset in discoverable (pairing) mode', 'Select the headset from the list of found devices', 'Enter or confirm the PIN', 'Test connectivity'], 'Enable → discoverable → select → PIN → test.'],
    ['mm', 'Which TWO email protocols retrieve mail to a mobile device? (Choose two.)', ['IMAP', 'POP3', 'SMTP', 'SNMP', 'LDAP'], 'IMAP and POP3 retrieve. SMTP sends.'],
    ['m', 'Which port does IMAP over SSL/TLS use?', ['993', '143', '995', '587'], 'IMAPS = 993. POP3S = 995. SMTP submission = 587.'],
    ['m', 'A laptop works on AC power but dies instantly when unplugged. MOST likely cause?', ['Failed battery', 'Bad DC jack', 'Faulty display', 'Corrupt OS'], 'If it runs on AC, the DC jack and adapter work. The battery is not holding charge.'],
    ['m', 'Which device adds external monitors, Ethernet and charging to a laptop through one Thunderbolt cable?', ['Docking station', 'KVM switch', 'NFC reader', 'Port replicator over Bluetooth'], 'Docks use USB-C/Thunderbolt or proprietary connectors.'],
    ['f', 'Policies like passcode rules and remote wipe for company phones are pushed with ___.', ['MDM', 'mobile device management'], 'MDM = Mobile Device Management.'],
    ['f', 'POP3 over SSL/TLS uses port ___.', ['995'], 'POP3 = 110, POP3S = 995.'],
    ['x', 'Match the laptop display part to its function.', [['Digitizer', 'Senses touch input'], ['Backlight', 'Lights an LCD panel'], ['Inverter', 'Powers a CCFL backlight on old laptops'], ['Antenna leads', 'Carry Wi-Fi signal from the bezel'], ['Webcam', 'Video capture in the top bezel']], 'Display assembly parts.'],
    ['m', 'A laptop keyboard types numbers when the user presses certain letters. FIRST check?', ['Num Lock / Fn lock', 'Replace the keyboard', 'Reinstall the keyboard driver', 'Update the BIOS'], 'Compact keyboards overlay a number pad on letters when Num Lock is on.'],
    ['t', 'Corporate email on a phone is commonly synchronised with Exchange ActiveSync.', true, 'ActiveSync syncs mail, contacts and calendar from Exchange/Microsoft 365.'],
    ['m', 'Which is TRUE about many current ultrabooks?', ['RAM and storage may be soldered to the system board', 'They all use DIMMs', 'They always have removable batteries', 'They use CCFL backlights'], 'Check the service manual before ordering upgrade parts.']
  ]
}
);
