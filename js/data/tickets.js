/* Help-desk tickets: scenario + questions. day = when it unlocks in the plan. */
window.TICKETS = [
{ id: 't01', exam: 1, dom: '5.0', day: 1, title: 'Monitor shows nothing after the weekend',
  text: `From: Priya (Accounts)\nPriority: Medium\n\nMy computer won't show anything this morning. The tower lights come on and I can hear the fans. The monitor's light is orange. Facilities cleaned the office on Saturday and moved the desks.`,
  q: [
    ['m', 'What should the technician check FIRST?', ['That the video cable is connected at both ends and the monitor is on the right input', 'Replace the graphics card', 'Reinstall the display driver', 'Reseat the CPU'], 'Desks were moved: question the obvious. Orange light = monitor has power but no signal.'],
    ['m', 'Which troubleshooting step does "facilities moved the desks on Saturday" belong to?', ['Identify the problem: determine recent changes', 'Verify functionality', 'Document findings', 'Implement the solution'], 'Recent changes are gathered in step 1.'],
    ['m', 'The cable was loose. The technician reseats it and the display works. What should happen NEXT?', ['Verify full functionality with the user', 'Close the ticket without notes', 'Replace the monitor anyway', 'Escalate to Tier 2'], 'Verify, then document.']
  ] },
{ id: 't02', exam: 1, dom: '3.0', day: 3, title: 'New RAM, same old 8 GB',
  text: `From: Marco (Design)\nPriority: Low\n\nIT gave me an extra 16 GB stick yesterday and I put it in myself. The PC boots fine but Windows still says 8 GB usable. My old stick is DDR4-3200, the new one says DDR4-3200 too. There are four slots, two grey and two black, and I put it in the slot next to the old one.`,
  q: [
    ['m', 'What is the MOST likely reason the new module is not detected?', ['It is not fully seated, or it is in a slot that is not populated correctly', 'DDR4 is not supported by Windows', 'The page file is too small', 'The CMOS battery is dead'], 'Same type and speed: check seating and slot placement first.'],
    ['m', 'For dual-channel operation with two modules, where should they go?', ['In matching colour-coded slots per the motherboard manual', 'Side by side in any two slots', 'Only in slot 1', 'Anywhere, the BIOS decides'], 'Dual channel needs the paired slots.'],
    ['mm', 'Which TWO tools help confirm the RAM is recognised after reseating? (Choose two.)', ['UEFI/BIOS system information page', 'msinfo32 / Task Manager Performance tab', 'Disk Management', 'Print Management', 'Event Viewer Security log'], 'Firmware and Windows both report installed memory.']
  ] },
{ id: 't03', exam: 1, dom: '3.0', day: 6, title: 'Warehouse printer smudges everything',
  text: `From: Shipping team\nPriority: High\n\nThe laser printer by the loading dock prints packing slips but the toner rubs off on our hands and smears on boxes. We replaced the toner cartridge yesterday and it's the same. Printer display says "Maintenance kit due".`,
  q: [
    ['m', 'Which component is MOST likely failing?', ['Fuser assembly', 'Pickup roller', 'Toner cartridge', 'Network card'], 'Toner not bonding = fuser. The message also hints at the maintenance kit (which includes the fuser).'],
    ['s', 'Order the technician\'s actions.', ['Power off and let the fuser cool', 'Install the maintenance kit (fuser and rollers)', 'Reset the maintenance page counter', 'Print a test page and confirm toner is fused', 'Document the repair in the ticket'], 'Safety, replace, reset counter, verify, document.'],
    ['m', 'Why must the technician wait before touching the fuser?', ['It runs at very high temperature and can burn', 'It holds a high-voltage charge like a CRT', 'Toner is magnetic', 'The laser is always on'], 'Fusers get extremely hot.']
  ] },
{ id: 't04', exam: 1, dom: '1.0', day: 7, title: 'Laptop Wi-Fi terrible since screen repair',
  text: `From: Daniel (Sales)\nPriority: Medium\n\nI got my laptop back from repair on Tuesday (new screen, it looks great). But now Wi-Fi only works if I sit right next to the access point. My colleague's laptop gets full bars at my desk.`,
  q: [
    ['m', 'What is the MOST likely cause?', ['The Wi-Fi antenna leads in the display were not reconnected', 'The AP is overloaded', 'The wireless driver is corrupted', 'The battery is failing'], 'Antennas live in the display bezel.'],
    ['m', 'What does the colleague\'s laptop working at the same desk tell you?', ['The problem is with Daniel\'s laptop, not the network', 'The AP is faulty', 'DNS is down', 'The building has interference'], 'Scope: one device.'],
    ['m', 'Which step of the methodology did the repair shop likely skip?', ['Verify full system functionality', 'Identify the problem', 'Document findings', 'Establish a theory'], 'They verified the screen, not the Wi-Fi.']
  ] },
{ id: 't05', exam: 1, dom: '2.0', day: 10, title: 'Half the office has 169.254 addresses',
  text: `From: Office manager\nPriority: Critical\n\nSince lunch, about half of our 40 PCs say "No internet". The other half are fine. A tech added 15 new laptops this morning for the interns. Our router does DHCP for 192.168.1.100 to 192.168.1.150.`,
  q: [
    ['m', 'What is the MOST likely cause?', ['The DHCP scope ran out of addresses', 'The ISP is down', 'DNS records were deleted', 'The switch is failing'], '51 addresses for 55 devices: scope exhaustion. Clients get APIPA.'],
    ['m', 'What address range are the failing PCs probably showing?', ['169.254.x.x', '192.168.1.x', '10.0.0.x', '127.0.0.1'], 'APIPA.'],
    ['mm', 'Which TWO are valid fixes? (Choose two.)', ['Expand the DHCP scope', 'Shorten the lease time', 'Disable DHCP', 'Set every PC to 169.254 manually', 'Turn off the switch'], 'More addresses or faster reuse.']
  ] },
{ id: 't06', exam: 1, dom: '2.0', day: 11, title: 'Wall jack in room 214 is dead',
  text: `From: Facilities\nPriority: Medium\n\nRoom 214 has a new desk but the network jack on the wall doesn't work. The patch panel in the closet isn't labelled. Laptop works fine in other rooms with the same cable.`,
  q: [
    ['m', 'Which tool identifies which patch panel port connects to jack 214?', ['Toner probe (tone generator)', 'Loopback plug', 'Crimper', 'PSU tester'], 'Tone the cable from the jack, find it at the panel.'],
    ['m', 'The run is found, but a cable tester shows two wires swapped at the jack. Which tool re-terminates it?', ['Punchdown tool', 'Crimper', 'Multimeter', 'Wi-Fi analyzer'], 'Keystone jacks are punched down.'],
    ['m', 'After the fix, the technician should label the port. This supports which step?', ['Document findings, actions and outcomes', 'Identify the problem', 'Establish a theory', 'Test the theory'], 'Documentation.']
  ] },
{ id: 't07', exam: 1, dom: '4.0', day: 12, title: 'Lab VMs won\'t start on new workstation',
  text: `From: Instructor, Networking lab\nPriority: Medium\n\nWe got new workstations for the lab. VirtualBox installs fine but every VM fails with "VT-x is not available". The old PCs ran the same VMs. Specs: 8-core CPU, 32 GB RAM, Windows 11 Pro.`,
  q: [
    ['m', 'What should the technician do FIRST?', ['Enable Intel VT-x / AMD-V in UEFI', 'Add more RAM', 'Install a Type 1 hypervisor', 'Replace the CPU'], 'Virtualization extensions are often disabled by default.'],
    ['m', 'VirtualBox is which type of hypervisor?', ['Type 2 (hosted)', 'Type 1 (bare metal)', 'Container engine', 'Emulator only'], 'Runs on top of Windows.'],
    ['m', 'Students want to revert VMs to a clean state after each class. Which feature?', ['Snapshots', 'RAID 1', 'BitLocker', 'PXE'], 'Snapshots roll back quickly.']
  ] },
{ id: 't08', exam: 1, dom: '5.0', day: 13, title: 'Server says "array degraded"',
  text: `From: Monitoring alert\nPriority: High\n\nFILESRV01: RAID 5 virtual disk status DEGRADED. Physical disk 2 status FAILED. Front panel: amber LED on bay 2. Server still serving files.`,
  q: [
    ['m', 'What is the BEST next action?', ['Replace disk 2 with a compatible drive and let the array rebuild', 'Shut down and delete the array', 'Pull disk 3 to test it', 'Convert the array to RAID 0'], 'RAID 5 survives one failure. Replace and rebuild.'],
    ['m', 'Why is this urgent even though files still work?', ['Another disk failure before rebuild completes will lose the array', 'RAID 5 runs slower than RAID 0', 'The LED will burn out', 'It voids the warranty'], 'No redundancy left while degraded.'],
    ['t', 'Because the server uses RAID 5, it does not need backups.', false, 'RAID is not a backup.']
  ] },
{ id: 't09', exam: 2, dom: '1.0', day: 15, title: 'New hire laptop can\'t join the domain',
  text: `From: HR onboarding\nPriority: High\n\nThe laptop we bought from a retail store for our new hire won't join the company domain. The option is not there. The sticker says Windows 11 Home.`,
  q: [
    ['m', 'What is the cause?', ['Windows 11 Home cannot join a domain', 'The DNS server is wrong', 'BitLocker is enabled', 'The laptop has no TPM'], 'Home edition limitation.'],
    ['m', 'What is the BEST fix?', ['Upgrade the license to Windows 11 Pro', 'Create a local admin account', 'Install Hyper-V', 'Convert the disk to GPT'], 'Edition upgrade enables domain join.'],
    ['mm', 'Which TWO other features will the user gain with Pro? (Choose two.)', ['BitLocker', 'Group Policy support', 'Microsoft Store', 'Windows Hello', 'Wi-Fi 6'], 'Home lacks BitLocker and Group Policy.']
  ] },
{ id: 't10', exam: 2, dom: '1.0', day: 17, title: 'Site works by IP, not by name',
  text: `From: Jordan (Marketing)\nPriority: Medium\n\nThe intranet moved to a new server last night. My coworkers can reach it at intranet.corp.local but I get "can't find server". If I type the IP address, it loads.`,
  q: [
    ['m', 'Which command should the technician try FIRST?', ['ipconfig /flushdns', 'sfc /scannow', 'chkdsk /f', 'gpupdate /force'], 'Old DNS entry cached on this PC.'],
    ['m', 'Which command confirms what IP the DNS server returns for the name?', ['nslookup intranet.corp.local', 'tracert 8.8.8.8', 'netstat -an', 'net use'], 'nslookup queries DNS.'],
    ['m', 'Why does it work for coworkers?', ['Their caches expired or never held the old record', 'They have faster PCs', 'They use a different browser', 'They are on 5 GHz'], 'Scope points to this PC\'s cache.']
  ] },
{ id: 't11', exam: 2, dom: '2.0', day: 20, title: 'Files renamed .locked on the shared drive',
  text: `From: Finance\nPriority: Critical\n\nAll the spreadsheets in S:\\Finance now end in .locked and won't open. There is a file called READ_ME_TO_RECOVER.txt asking for payment. Abby says she opened an "invoice" attachment this morning and nothing happened.`,
  q: [
    ['m', 'What should the technician do FIRST with Abby\'s PC?', ['Disconnect it from the network (quarantine)', 'Pay the ransom', 'Run Disk Cleanup', 'Reboot it repeatedly'], 'Stop the spread.'],
    ['m', 'Which malware type is this?', ['Ransomware', 'Adware', 'Keylogger', 'Cryptominer'], 'Encrypt + ransom note.'],
    ['m', 'How should the encrypted shared files be recovered?', ['Restore from a clean, tested backup', 'Rename the extensions back', 'Run chkdsk', 'Defragment the share'], 'Backups are the recovery path.'],
    ['m', 'Which final step prevents this from happening again with Abby?', ['Educate the end user about phishing attachments', 'Disable her account permanently', 'Give her admin rights', 'Turn off email'], 'Last malware removal step.']
  ] },
{ id: 't12', exam: 2, dom: '2.0', day: 21, title: '"IT" called asking for my password',
  text: `From: Leo (Reception)\nPriority: High\n\nSomeone called saying they were from the IT help desk and needed my password to fix my email quota. They knew my manager's name. I gave it to them, then it felt weird. Now I'm getting MFA prompts I didn't start.`,
  q: [
    ['m', 'Which attack happened?', ['Vishing (social engineering by phone)', 'Smishing', 'Evil twin', 'SQL injection'], 'Voice phishing with pretexting.'],
    ['m', 'What should be done FIRST?', ['Reset Leo\'s password and revoke active sessions, and tell him to deny the MFA prompts', 'Ignore the prompts', 'Disable MFA', 'Wait to see if anything happens'], 'Contain the compromised account.'],
    ['m', 'The unexpected MFA prompts suggest the attacker is attempting:', ['MFA fatigue / push bombing to get an approval', 'A DDoS', 'A zero-day', 'Dumpster diving'], 'Repeated prompts hope the user taps approve.']
  ] },
{ id: 't13', exam: 2, dom: '2.0', day: 22, title: 'Contractor can read but not edit',
  text: `From: Project lead\nPriority: Medium\n\nOur contractor Sam is in the "Projects-Edit" group which has Modify on the NTFS permissions of \\\\fs01\\projects. He can open files but can't save changes from his laptop. When he logs on at the server console itself, he can save fine.`,
  q: [
    ['m', 'What is the MOST likely cause?', ['The share permission is Read, which is more restrictive over the network', 'NTFS permissions are wrong', 'His account is locked', 'The disk is full'], 'Works locally, fails over network = share permission.'],
    ['m', 'What should the technician change?', ['Set the share permission to Change (or Full Control) for the group', 'Give Sam Full Control NTFS', 'Disable UAC', 'Move the files to his desktop'], 'Then NTFS Modify becomes the effective limit.'],
    ['t', 'When share and NTFS permissions combine, the more permissive one wins.', false, 'The most restrictive wins.']
  ] },
{ id: 't14', exam: 2, dom: '3.0', day: 24, title: 'BSOD after last night\'s driver update',
  text: `From: Night shift supervisor\nPriority: High\n\nPC-ER-07 blue screens about two minutes after logging in. Stop code mentions nvlddmkm.sys. Automatic updates installed a new graphics driver overnight.`,
  q: [
    ['m', 'What is the least invasive fix?', ['Boot into Safe Mode and roll back the graphics driver', 'Reinstall Windows', 'Replace the graphics card', 'Reset this PC'], 'Undo the recent change.'],
    ['m', 'Where can the technician confirm the crash details and time?', ['Event Viewer (System log)', 'Disk Management', 'Task Scheduler', 'Certificate Manager'], 'BugCheck events are logged.'],
    ['m', 'After the fix, which preventive measure fits step 6?', ['Pause or control driver updates for that device until a fixed version is tested', 'Disable Windows Update permanently', 'Remove the antivirus', 'Disable UAC'], 'Preventive measure, then document.']
  ] },
{ id: 't15', exam: 2, dom: '3.0', day: 24, title: 'Phone battery drains by lunchtime',
  text: `From: Ana (Field sales)\nPriority: Low\n\nMy company Android phone used to last all day. Since last week it's dead by noon, gets warm, and I used my whole data allowance. I installed a free "battery booster" app from a link a friend sent.`,
  q: [
    ['m', 'What is the MOST likely cause?', ['A malicious app sideloaded from a link', 'A failing screen', 'A worn SIM card', 'Weak Wi-Fi'], 'Battery drain + data spike + sideloaded app = malware.'],
    ['m', 'What should the technician do FIRST?', ['Check battery and data usage by app, then uninstall the suspicious app', 'Replace the battery', 'Factory reset immediately', 'Root the phone to remove it'], 'Least invasive first.'],
    ['m', 'Which policy control would have blocked the install?', ['MDM restriction on installs from unknown sources', 'Screen lock timeout', 'Location services', 'Remote wipe'], 'Block sideloading via MDM.']
  ] },
{ id: 't16', exam: 2, dom: '4.0', day: 25, title: 'Restore the payroll folder from Thursday',
  text: `From: Payroll\nPriority: High\n\nSomeone deleted the Payroll folder on Friday at 10 am. Backups: full every Sunday night, incremental every other night at 11 pm. We need it as of Thursday night.`,
  q: [
    ['m', 'Which backups are needed to restore Thursday night\'s state?', ['Sunday full + Monday, Tuesday, Wednesday and Thursday incrementals', 'Sunday full + Thursday incremental only', 'Thursday incremental only', 'Sunday full only'], 'Incrementals chain from the last full.'],
    ['m', 'If the company switched to differentials, what would the same restore need?', ['Sunday full + Thursday differential', 'All differentials since Sunday', 'Thursday differential only', 'Two full backups'], 'Differential = full + latest differential.'],
    ['m', 'Where should the folder be restored to avoid overwriting anything newer?', ['An alternate location, then copied back after checking', 'Over the top of the whole share', 'To the user\'s USB drive', 'To the backup server root'], 'Alternative location restore is safer.']
  ] },
{ id: 't17', exam: 2, dom: '4.0', day: 26, title: 'Angry customer, late repair',
  text: `From: Front counter\nPriority: Medium\n\nMr. Singh is at the counter and upset. His laptop was promised for Monday; it's Wednesday. The replacement keyboard is on backorder until Friday. He says he needs it for a presentation tomorrow.`,
  q: [
    ['m', 'What is the BEST first response?', ['Listen without interrupting, apologize for the delay, and explain the status clearly', 'Tell him the supplier is to blame', 'Ask him to come back Friday', 'Explain keyboard part numbers in detail'], 'Active listening and clear communication.'],
    ['mm', 'Which TWO options show good customer service? (Choose two.)', ['Offer to return the laptop now with an external keyboard so he can present', 'Give a firm updated timeline and follow up when the part arrives', 'Post about the difficult customer on social media', 'Argue that Monday was only an estimate', 'Use slang to sound friendly'], 'Offer alternatives, set expectations, follow up.'],
    ['m', 'What should be updated after the conversation?', ['The ticket, with the new timeline and what was agreed', 'Nothing', 'The AUP', 'The SDS'], 'Document communication.']
  ] },
{ id: 't18', exam: 2, dom: '2.0', day: 23, title: 'Set up the new dental office router',
  text: `From: Owner, small dental clinic\nPriority: Medium\n\nWe got a new Wi-Fi router. Staff PCs, the X-ray workstation, and patients in the waiting room all need internet. The installer left it with the default settings and the password is on a sticker.`,
  q: [
    ['s', 'Order the hardening steps.', ['Change the default admin password', 'Update the router firmware', 'Configure WPA3 (or WPA2-AES) with a strong passphrase', 'Disable WPS and UPnP', 'Create a separate guest network for patients'], 'Credentials, patch, encryption, reduce attack surface, segment.'],
    ['m', 'Why give patients a guest network?', ['To keep them isolated from staff and clinical devices that handle PHI', 'To make Wi-Fi faster for staff', 'Because WPA3 requires it', 'To avoid using DHCP'], 'Segmentation protects health data.'],
    ['m', 'The X-ray vendor needs remote access to their workstation. BEST approach?', ['A VPN or vendor-approved remote tool with MFA, not open RDP to the internet', 'Port forward 3389 to the X-ray PC', 'Put the X-ray PC in the DMZ', 'Disable the firewall'], 'Never expose RDP directly.']
  ] }
];
