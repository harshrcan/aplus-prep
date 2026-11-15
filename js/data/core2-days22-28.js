/* Core 2 lessons, days 22 to 28 */
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(
{
  day: 22, exam: 2, dom: '2.0', title: 'Windows security settings, hardening and data destruction', obj: '220-1202 · 2.0 Windows security settings · workstation hardening · data destruction and disposal', deck: 'd22',
  goals: ['Configure Defender, firewall, users and groups, UAC', 'Combine NTFS and share permissions correctly', 'Use BitLocker, BitLocker To Go and EFS', 'Harden workstations and pick the right data destruction method'],
  concept: `
<h3>Windows security settings</h3>
<tb>Setting;Know this
Microsoft Defender Antivirus;Real-time protection, definitions, scans. Disables itself if third-party AV is installed
Defender Firewall;Profiles (domain/private/public), allow apps, port rules. Advanced: wf.msc
Users and groups;Administrator, Standard user, Guest (disabled), Power Users (legacy). Local vs Microsoft account
UAC;User Account Control prompts before elevation. Don't disable it
Run as administrator;Elevate one program
Login options;Password, PIN, Windows Hello (face/fingerprint), security key, SSO
BitLocker;Full-volume encryption (Pro+). Uses TPM. Save the recovery key
BitLocker To Go;Encrypts removable drives
EFS;Encrypting File System: encrypt individual files/folders on NTFS, tied to the user account</tb>
<h3>NTFS vs share permissions</h3>
<tb>;NTFS permissions;Share permissions
Applies;Locally and over the network;Only over the network
Levels;Full control, Modify, Read & execute, List folder contents, Read, Write;Full control, Change, Read
Combine;Most restrictive of the two wins when accessed over the network;</tb>
<ul>
<li>Within each set, permissions from multiple groups add up (cumulative), but an explicit <b>Deny</b> overrides Allow.</li>
<li><b>Inheritance</b>: child folders inherit from parent unless disabled.</li>
<li><b>Moving</b> a file within the same NTFS volume keeps its permissions. <b>Copying</b>, or moving to a different volume, inherits the destination's permissions.</li>
</ul>
<t>Share = Read, NTFS = Full Control → over the network the user gets <b>Read</b> (most restrictive). Locally they get Full Control.</t>
<h3>Workstation hardening (best practices)</h3>
<ul>
<li>Passwords: length (12+), complexity, expiration per policy, no reuse. Screensaver lock with password, BIOS/UEFI passwords.</li>
<li>Account management: restrict user permissions, restrict login times, disable guest, failed-attempt <b>lockout</b>, timeout/screen lock, change default admin names/passwords.</li>
<li>Disable AutoRun/AutoPlay. Disable unused services.</li>
<li>Patch OS and apps. Use AV/EDR and the firewall.</li>
<li>Encrypt drives. Use least privilege (daily use as standard user).</li>
</ul>
<h3>Data destruction and disposal</h3>
<tb>Method;Notes
Physical destruction;Drilling, shredding, degaussing (magnetic HDDs only, not SSDs), incineration
Degaussing;Strong magnet erases magnetic media. Drive is unusable after
Recycling/repurposing;Erase first: secure erase / low-level format / overwrite (multiple passes)
Standard format;Does NOT securely remove data. Recoverable
SSD;Use manufacturer secure erase or crypto erase (destroy the encryption key). Overwriting is unreliable
Third-party vendor;Get a certificate of destruction for compliance</tb>
<k>Reuse inside the company → secure wipe. Leaving the company / end of life with sensitive data → physical destruction + certificate. Degaussing does nothing to SSDs.</k>`,
  map: ['Windows security', '', [
    ['Settings', '', [['Defender AV', ''], ['Firewall profiles', ''], ['UAC', 'elevation prompts'], ['Windows Hello', ''], ['BitLocker / To Go', ''], ['EFS', 'per file']]],
    ['Permissions', '', [['NTFS', 'local + network'], ['Share', 'network only'], ['most restrictive wins', 'combined'], ['Deny overrides', ''], ['move same volume keeps', 'copy inherits']]],
    ['Hardening', '', [['strong passwords', ''], ['lockout, timeout', ''], ['disable guest, AutoRun', ''], ['patch, AV', '']]],
    ['Destruction', '', [['shred, drill, incinerate', ''], ['degauss', 'HDD only'], ['secure erase', 'reuse'], ['certificate', 'vendor']]]
  ]],
  cards: `UAC | User Account Control: prompts before admin-level changes
BitLocker | Full-volume encryption (Pro+), uses TPM
BitLocker To Go | BitLocker for removable drives
EFS | Encrypting File System: per-file NTFS encryption tied to user
NTFS permissions | Apply locally and over the network
Share permissions | Apply only when accessed over the network
NTFS + share combined | Most restrictive applies
Explicit Deny | Overrides Allow
Move within same NTFS volume | Keeps original permissions
Copy (or move to another volume) | Inherits destination permissions
Account lockout | Locks account after failed sign-in attempts
Degaussing | Erases magnetic media with a strong magnetic field (not SSDs)
Certificate of destruction | Proof from a vendor that media was destroyed
SSD sanitization | Manufacturer secure erase or crypto erase
Standard format | Not secure: data is recoverable`,
  ex: [
    ['m', 'A folder has share permission Read and NTFS permission Full Control for a user. What access does the user have over the network?', ['Read', 'Full Control', 'Change', 'No access'], 'Most restrictive of share and NTFS.'],
    ['m', 'A user is in two groups: one has NTFS Modify, the other has Read. What is the effective NTFS permission?', ['Modify', 'Read', 'No access', 'Full Control'], 'NTFS permissions are cumulative unless Deny is set.'],
    ['m', 'A user is in a group with Allow Modify and another with Deny Write. Effective result?', ['Write is denied', 'Modify works fully', 'Full Control', 'Read is denied too'], 'Explicit Deny overrides Allow.'],
    ['m', 'A file is copied from D:\\Finance to D:\\Public. Which permissions does it have?', ['Inherits D:\\Public permissions', 'Keeps Finance permissions', 'No permissions', 'Full Control for everyone'], 'Copy inherits the destination.'],
    ['m', 'A laptop with customer data must be protected if stolen. BEST solution on Windows 11 Pro?', ['BitLocker', 'EFS on one folder', 'A screensaver password', 'A BIOS user password only'], 'Full-volume encryption.'],
    ['m', 'Which feature encrypts a USB flash drive on Windows?', ['BitLocker To Go', 'EFS', 'FileVault', 'Secure Boot'], 'BitLocker To Go.'],
    ['m', 'Old HDDs containing patient records are being retired and will leave the building. BEST method?', ['Physical destruction by a vendor with a certificate of destruction', 'Quick format', 'Delete the partitions', 'Move them to a storage closet'], 'Destroy and document.'],
    ['m', 'Why is degaussing NOT effective on SSDs?', ['SSDs store data in flash memory, not magnetically', 'SSDs are too small', 'Degaussers need SATA power', 'SSDs are already encrypted'], 'Degaussing only affects magnetic media.'],
    ['m', 'Drives will be reused by another department inside the company. Which method?', ['Secure erase / multi-pass overwrite', 'Shredding', 'Incineration', 'Degaussing'], 'Wipe so they remain usable.'],
    ['m', 'Which setting locks an account after five wrong passwords?', ['Account lockout threshold', 'Password expiration', 'UAC', 'Login time restriction'], 'Lockout policy.'],
    ['mm', 'Which TWO are workstation hardening best practices? (Choose two.)', ['Disable the Guest account', 'Disable AutoRun', 'Disable UAC', 'Give users local admin rights', 'Turn off Windows Update'], 'Disable guest and AutoRun.'],
    ['m', 'A user needs one program to run with administrator rights occasionally. BEST approach?', ['Right-click → Run as administrator with admin credentials', 'Make the user a permanent admin', 'Disable UAC', 'Log in as Administrator daily'], 'Least privilege.'],
    ['f', 'Windows per-file encryption on NTFS is called ___.', ['EFS', 'encrypting file system'], 'EFS.'],
    ['f', 'Share permission levels are Full Control, Change and ___.', ['Read'], 'Read.'],
    ['x', 'Match the scenario to the destruction method.', [['HDDs leaving the company with sensitive data', 'Shred with certificate of destruction'], ['Reusing a laptop internally', 'Secure erase'], ['Magnetic tapes to be destroyed', 'Degauss'], ['SSD to be reused', 'Manufacturer secure erase'], ['Paper records', 'Cross-cut shredding']], 'Destruction methods.'],
    ['t', 'A standard (quick) format securely removes all data from a drive.', false, 'Data remains recoverable.'],
    ['m', 'Which Windows feature prompts users before an app makes system-level changes?', ['UAC', 'BitLocker', 'Windows Hello', 'SmartScreen'], 'User Account Control.']
  ]
},
{
  day: 23, exam: 2, dom: '2.0', title: 'Mobile, SOHO router and browser security', obj: '220-1202 · 2.0 securing mobile devices · SOHO wireless/wired security · browser security', deck: 'd23',
  goals: ['Secure mobile devices: screen locks, encryption, remote wipe, locator, MDM/BYOD', 'Harden a SOHO router step by step', 'Configure secure browser settings and recognise certificate warnings'],
  concept: `
<h3>Mobile device security</h3>
<tb>Control;Purpose
Screen lock;PIN, pattern, password, fingerprint, facial recognition. Lock after inactivity
Failed login restrictions;Wipe or lock after X attempts
Device encryption;On by default on modern iOS/Android when a passcode is set
Remote wipe;Erase lost/stolen devices (MDM or Find My / Find My Device)
Locator apps;Find My (Apple), Find My Device (Google)
OS updates / patches;Close vulnerabilities
Antivirus / anti-malware;Especially Android
Firewalls;Mobile firewall apps
MDM / BYOD policies;Profiles, enforce passcodes, separate work data (containers), app allow lists
Remote backup;iCloud, Google, OneDrive
Policies;Acceptable use, BYOD agreement
Authenticator apps;MFA</tb>
<p>Risks: sideloading apps from untrusted sources, jailbreaking (iOS) / rooting (Android) removes security, public Wi-Fi, lost devices.</p>
<h3>SOHO router / network security</h3>
<tb>Step;Why
Change default admin username/password;Defaults are public
Update firmware;Patch vulnerabilities
Change default SSID;Don't reveal router model
Disable SSID broadcast?;Minor obscurity only, not real security
Use WPA3 (or WPA2-AES);Encryption
Disable WPS;PIN can be brute-forced
Disable UPnP;Apps can open ports automatically
Disable unused ports / remote management;Reduce attack surface
Content filtering / parental controls;Block categories
IP filtering / MAC filtering;Allow/deny lists (MAC can be spoofed)
Port forwarding / mapping;Send inbound traffic on a port to one internal host. Open only what's needed
DMZ;Puts one host fully exposed. Avoid or use carefully
Static IP / DHCP reservations;Predictable addressing for servers/printers
Guest network;Isolate visitors and IoT
Physical placement;Router in a secure, central location. Adjust radio power to cover only needed area
Screened subnet;Business version of DMZ</tb>
<h3>Browser security</h3>
<ul>
<li>Download browsers and extensions only from trusted sources. Verify file <b>hashes</b> for downloads.</li>
<li><b>Certificates</b>: padlock + valid certificate = encrypted and identity verified. Warnings mean expired, self-signed, wrong name or interception. Don't click through on banking/corporate sites.</li>
<li>Settings: pop-up blocker, clear cache/cookies/history, private browsing, ad blocker, password manager, secure DNS, browser sync, disable unneeded extensions.</li>
<li>Proxy settings configured by the company. Trusted sources. Browser updates.</li>
<li>Browser redirections, unexpected new tabs, homepage changes = adware/hijacker. Reset the browser and remove extensions.</li>
</ul>`,
  map: ['Mobile, SOHO, browser', '', [
    ['Mobile', '', [['screen lock + failed attempts', ''], ['encryption', ''], ['remote wipe, locator', ''], ['MDM / BYOD', ''], ['no jailbreak/root', ''], ['no sideloading', '']]],
    ['SOHO router', '', [['change default creds', 'first'], ['update firmware', ''], ['WPA3, disable WPS', ''], ['disable UPnP', ''], ['port forwarding', 'only needed'], ['guest network', ''], ['MAC filter', 'spoofable']]],
    ['Browser', '', [['trusted sources, hashes', ''], ['certificates', 'warnings'], ['pop-up / ad blocker', ''], ['clear cache, private mode', ''], ['extensions', 'review']]]
  ]],
  cards: `Remote wipe | Erase a lost/stolen mobile device remotely
Locator app | Find My (Apple) / Find My Device (Google)
Jailbreaking | Removing iOS restrictions, breaks security model
Rooting | Gaining root on Android, bypasses security
Sideloading | Installing apps from outside the official store
WPS | Wi-Fi Protected Setup, PIN can be brute-forced, disable it
UPnP | Lets devices open router ports automatically, disable if unused
Port forwarding | Sends inbound traffic on a port to one internal host
DMZ (SOHO) | Exposes one internal host to all inbound traffic
MAC filtering | Allow/deny by MAC address, easily spoofed
Guest network | Isolated Wi-Fi for visitors/IoT
Certificate warning | Expired, self-signed, wrong name, or interception
File hash | Verifies a download has not been altered
First step to secure a new SOHO router | Change the default admin password`,
  ex: [
    ['m', 'A company phone is lost in a taxi and contains client data. What should IT do FIRST?', ['Remotely lock and wipe it through MDM', 'Wait a day to see if it is returned', 'Change the user\'s desktop password', 'Disable the user\'s badge'], 'Protect the data via remote wipe.'],
    ['m', 'Which setting erases a phone after 10 failed passcode attempts?', ['Failed login attempt restriction / wipe', 'Screen timeout', 'Locator service', 'Airplane mode'], 'Failed-attempt wipe.'],
    ['m', 'An employee jailbroke their company iPhone to install a game. Why is this a problem?', ['It bypasses built-in security controls and allows untrusted apps', 'It voids the battery', 'It disables Wi-Fi', 'It changes the IMEI'], 'Jailbreaking removes iOS protections.'],
    ['m', 'Which router feature should be disabled because its PIN can be brute-forced?', ['WPS', 'WPA3', 'DHCP', 'NAT'], 'WPS.'],
    ['m', 'A home user runs a game server and friends must connect to it on TCP 25565. Configure:', ['Port forwarding to the server\'s IP', 'A DMZ for every PC', 'Disable the firewall', 'MAC filtering'], 'Forward only the needed port.'],
    ['m', 'Why is MAC filtering alone weak security?', ['MAC addresses can be easily spoofed', 'It slows the network', 'It requires WPS', 'It only works on 5 GHz'], 'Spoofable.'],
    ['m', 'Which SOHO setting lets apps automatically open ports and should be disabled if not needed?', ['UPnP', 'DHCP', 'QoS', 'SSID broadcast'], 'Universal Plug and Play.'],
    ['m', 'Visitors need internet in the office lobby without accessing internal devices. Configure:', ['A guest wireless network', 'Port forwarding', 'A DMZ host', 'WPS'], 'Guest networks isolate traffic.'],
    ['m', 'A browser shows "Your connection is not private" on the company payroll site. BEST action?', ['Do not proceed and report it to IT', 'Click Advanced and continue', 'Clear the cache and continue', 'Disable the antivirus'], 'Certificate errors may mean interception.'],
    ['m', 'A user\'s homepage keeps changing and searches redirect to unknown sites. FIRST step?', ['Review and remove suspicious browser extensions, then reset the browser', 'Replace the network card', 'Reinstall the OS', 'Change the DNS server only'], 'Browser hijacker / adware.'],
    ['m', 'How can a user confirm a downloaded installer has not been tampered with?', ['Compare its hash with the one published by the vendor', 'Check the file icon', 'Rename the file', 'Check the file size only'], 'Hashes verify integrity.'],
    ['mm', 'Which TWO steps should be done FIRST when setting up a new SOHO router? (Choose two.)', ['Change the default admin password', 'Update the firmware', 'Enable WPS', 'Enable UPnP', 'Put a PC in the DMZ'], 'Change default credentials and patch.'],
    ['f', 'On Android, gaining full administrative control of the OS is called ___.', ['rooting', 'root'], 'Rooting. iOS = jailbreaking.'],
    ['f', 'Installing apps from outside the official app store is called ___.', ['sideloading'], 'Sideloading.'],
    ['x', 'Match the SOHO feature to its effect.', [['Port forwarding', 'Sends one port to one internal host'], ['DMZ', 'Exposes a host to all inbound traffic'], ['Guest network', 'Isolates visitors'], ['Content filtering', 'Blocks website categories'], ['DHCP reservation', 'Fixed IP for a device']], 'SOHO router features.'],
    ['t', 'Hiding the SSID is a strong security control on its own.', false, 'Hidden SSIDs are easily discovered. Use WPA3.']
  ]
},
{
  day: 24, exam: 2, dom: '3.0', title: 'Software troubleshooting: Windows, mobile and security issues', obj: '220-1202 · 3.0 Windows OS issues · mobile OS and app issues · mobile and PC security issues', deck: 'd24',
  goals: ['Map Windows symptoms to fixes (BSOD, slow, boot, services, profiles, updates)', 'Troubleshoot mobile app and OS problems', 'Recognise security symptoms on PCs and phones', 'Choose the least invasive fix first'],
  concept: `
<h3>Windows symptoms and fixes</h3>
<tb>Symptom;Common fixes (least invasive first)
BSOD;Note stop code, check Event Viewer, roll back driver/update, test RAM, Safe Mode, System Restore
Sluggish performance;Task Manager (high CPU/RAM/disk), disable startup apps, malware scan, disk space, defrag HDD, add RAM/SSD
Boot problems / no OS found;Boot order, Startup Repair (WinRE), bootrec /fixmbr /fixboot /rebuildbcd
Frequent shutdowns;Overheating, power settings, hardware
Services not starting;services.msc: start type, dependencies, account credentials. Event Viewer
Applications crashing;Update/repair/reinstall app, compatibility mode, check logs
Low memory warnings;Close apps, increase page file, add RAM
USB controller resource warnings;Too many devices on one controller, move to another port
System instability;Updates, drivers, hardware tests, sfc /scannow
No OS found;Boot order, drive health, repair boot record
Slow profile load;Rebuild the user profile, roaming profile size
Time drift;CMOS battery, sync with NTP (w32tm /resync)
Failed update;Run Windows Update troubleshooter, clear SoftwareDistribution, retry, roll back</tb>
<h3>Windows recovery tools</h3>
<tb>Tool;Use
Safe Mode;Minimal drivers/services. Remove problem drivers/malware
System Restore;Roll system files/registry/drivers back to a restore point (keeps personal files)
Startup Repair (WinRE);Fixes boot problems
Reset this PC;Reinstall Windows, keep or remove files
Rollback update / driver;Undo the change that broke it
Rebuild profile;New profile, copy data across
Reimage;Last resort</tb>
<h3>Mobile OS and app issues</h3>
<tb>Symptom;Fixes
App fails to launch / crashes;Force stop, clear cache, update, reinstall, check storage
App fails to update;Storage space, network, app store sign-in, OS version
Slow to respond;Close background apps, restart, free storage, update
OS fails to update;Storage, battery %, Wi-Fi, compatibility
Battery life issues;Check battery usage by app, brightness, background refresh, battery health
Random reboots;OS bug, overheating, failing battery, bad app
Connectivity issues (Bluetooth, Wi-Fi, NFC);Toggle radio, forget/re-pair, airplane mode off, restart
Screen does not autorotate;Rotation lock, sensor calibration</tb>
<h3>Security symptoms</h3>
<tb>Platform;Signs of compromise
PC;Pop-ups, browser redirection, security alerts from fake AV, slow performance, internet connectivity issues, PC lockups, OS update failures, missing/renamed files, unwanted notifications, file permission changes, email sent from the account the user didn't send, AV disabled
Mobile;High network traffic, sluggish response, data-usage limit notifications, limited/no internet, high battery drain, unexpected apps, leaked personal files/data, fake security warnings, unwanted notifications, unexpected app behaviour</tb>
<n>APK from an unknown website, developer mode left on, rooted/jailbroken device, or a bootloader unlocked = mobile security risk. Remove the app, run security scan, factory reset if needed.</n>`,
  map: ['Software troubleshooting', '', [
    ['Windows', '', [['BSOD', 'stop code, driver, RAM'], ['slow', 'Task Manager, startup'], ['boot', 'Startup Repair, bootrec'], ['services', 'start type, account'], ['profile', 'rebuild'], ['update failed', 'troubleshooter, roll back']]],
    ['Recovery', '', [['Safe Mode', ''], ['System Restore', 'keeps files'], ['Reset this PC', ''], ['reimage', 'last']]],
    ['Mobile', '', [['app crash', 'clear cache, reinstall'], ['battery drain', 'usage by app'], ['update fails', 'storage, battery'], ['no rotate', 'rotation lock']]],
    ['Security signs', '', [['PC', 'pop-ups, redirects, AV off'], ['mobile', 'data spike, battery drain, unknown apps']]]
  ]],
  cards: `BSOD first steps | Note the stop code, check Event Viewer, roll back recent driver/update
System Restore | Reverts system files, registry, drivers. Keeps personal files
Safe Mode | Boots with minimal drivers and services
Startup Repair | WinRE tool that fixes boot problems
bootrec /rebuildbcd | Rebuilds the Boot Configuration Data store
Slow sign-in for one user only | Corrupt or bloated user profile, rebuild it
Service fails to start | Check startup type, dependencies, logon account
Time keeps drifting | CMOS battery or NTP sync (w32tm /resync)
Mobile app keeps crashing | Force stop, clear cache, update or reinstall
Phone overheats and drains battery | Check battery usage by app, possible malware
Browser redirection | Adware/hijacker sign
Screen won't autorotate | Check rotation lock`,
  ex: [
    ['m', 'A PC started blue-screening right after a new graphics driver was installed. FIRST step?', ['Boot into Safe Mode and roll back the driver', 'Reinstall Windows', 'Replace the GPU', 'Run chkdsk'], 'Undo the recent change.'],
    ['m', 'A PC is slow. Task Manager shows 100% disk usage from a startup utility. BEST fix?', ['Disable the utility in Startup apps', 'Add more RAM', 'Replace the CPU', 'Reset the PC'], 'Least invasive fix.'],
    ['m', 'Only one user gets a temporary profile and missing desktop on a shared PC. Other users are fine. MOST likely fix?', ['Rebuild the user\'s profile', 'Reinstall Windows', 'Replace the drive', 'Reset the router'], 'Corrupt profile.'],
    ['m', 'A Windows service will not start and Event Viewer shows a logon failure. Check:', ['The service account credentials in services.msc', 'The monitor cable', 'BitLocker status', 'The DNS cache'], 'Service logon account password may have changed.'],
    ['m', 'After an update, the PC loops to "Automatic Repair". Which tool in WinRE should be tried first?', ['Startup Repair', 'Reset this PC (remove everything)', 'Format', 'Diskpart clean'], 'Least invasive boot fix.'],
    ['m', 'Which recovery option reverts drivers and registry changes but keeps the user\'s documents?', ['System Restore', 'Reset this PC (remove everything)', 'Reimage', 'Clean install'], 'Restore points.'],
    ['m', 'A user\'s phone app crashes on launch after an update. FIRST step?', ['Force stop and clear the app cache', 'Factory reset the phone', 'Replace the battery', 'Root the phone'], 'Least invasive.'],
    ['m', 'A phone suddenly uses far more data and battery, and an unknown app appeared. MOST likely:', ['Malware', 'Failing screen', 'Bad SIM', 'Low storage only'], 'Classic compromise signs.'],
    ['m', 'A phone will not install an OS update. It has 2% storage free and 15% battery. FIRST step?', ['Free up storage and charge the device', 'Factory reset', 'Replace the battery', 'Jailbreak it'], 'Updates need space and battery.'],
    ['m', 'A tablet screen won\'t rotate to landscape in any app. FIRST check?', ['Rotation lock setting', 'Replace the accelerometer', 'Reinstall the OS', 'Recalibrate battery'], 'Settings first.'],
    ['m', 'A user reports pop-ups, a changed homepage and a fake "your PC is infected" alert. What is MOST likely?', ['Malware / adware infection', 'Failing hard drive', 'DNS server down', 'Expired certificate'], 'Security symptoms.'],
    ['m', 'A PC\'s clock drifts several minutes each day even when powered on and domain sign-ins fail. FIRST check?', ['Time synchronization with the domain/NTP', 'GPU driver', 'Printer queue', 'Screen resolution'], 'Kerberos needs synced time.'],
    ['mm', 'Which TWO are signs of a compromised PC? (Choose two.)', ['Antivirus has been disabled and won\'t re-enable', 'Emails the user never sent appear in Sent Items', 'Monitor is set to 60 Hz', 'Caps Lock is on', 'Printer is out of paper'], 'Disabled AV and unauthorized email.'],
    ['f', 'The command bootrec /___ rebuilds the Boot Configuration Data.', ['rebuildbcd'], 'bootrec /rebuildbcd.'],
    ['x', 'Match the symptom to the FIRST fix.', [['BSOD after driver update', 'Roll back driver'], ['Slow boot from startup apps', 'Disable startup items'], ['One user profile corrupt', 'Rebuild the profile'], ['App crashes on phone', 'Clear cache / reinstall app'], ['Low storage blocks update', 'Free up space']], 'Least invasive first.'],
    ['t', 'System Restore deletes the user\'s personal documents.', false, 'It reverts system settings, not personal files.'],
    ['m', 'Windows Update keeps failing with the same error. After running the Windows Update troubleshooter, what next?', ['Clear the SoftwareDistribution folder and retry', 'Disable updates permanently', 'Reimage immediately', 'Replace the drive'], 'Reset the update cache.']
  ]
},
{
  day: 25, exam: 2, dom: '4.0', title: 'Documentation, ticketing, change management and backups', obj: '220-1202 · 4.0 documentation and support systems · change management · backup and recovery', deck: 'd25',
  goals: ['Write a good ticket and use a knowledge base', 'Know asset management and documentation types', 'Walk through the change management process', 'Choose full, incremental, differential and synthetic backups and rotation schemes'],
  concept: `
<h3>Ticketing systems</h3>
<ul>
<li>Ticket fields: user info, device info, description, categories, severity/priority, escalation levels, clear and concise written communication: problem description, progress notes, problem resolution.</li>
<li>Severity: impact × urgency. A whole department down outranks one user's wallpaper.</li>
<li>Escalate per SLA (service level agreement) and tier (Tier 1 help desk → Tier 2 → Tier 3 engineering).</li>
</ul>
<h3>Documentation types</h3>
<tb>Doc;Purpose
Knowledge base / articles;Reusable fixes
Incident reports;What happened, impact, response
SOP (standard operating procedure);Step-by-step for routine tasks (e.g. custom software install)
New user / onboarding checklist;Accounts, hardware, access
User offboarding checklist;Disable accounts, collect equipment, transfer data
AUP;Acceptable use policy
Network topology diagram;How the network connects
Regulatory compliance requirements;Policies for laws/standards
Splash screens / login banners;Legal notice at sign-in</tb>
<h3>Asset management</h3>
<p>Inventory lists, asset tags and IDs, database system (CMDB), procurement life cycle, warranty and licensing, assigned users, warranty tracking, end-of-life planning. MDM tracks mobile assets.</p>
<h3>Change management (the process)</h3>
<tb>#;Step
1;Documented business processes and a request form
2;Purpose of the change
3;Scope of the change
4;Date and time of the change (maintenance window)
5;Affected systems and impact
6;Risk analysis (risk level)
7;Change board approval (CAB)
8;End-user acceptance
9;Plan for the change, including a <b>rollback plan</b> and a <b>sandbox test</b>
10;Responsible staff member
11;Implement and document</tb>
<n>Change types: standard (pre-approved, low risk), normal (needs CAB), emergency (urgent, approved after). Always have a backout/rollback plan.</n>
<h3>Backups</h3>
<tb>Type;What it copies;Restore needs;Archive bit
Full;Everything;Just the last full;Cleared
Incremental;Changes since the last backup of any kind;Last full + every incremental since;Cleared
Differential;Changes since the last full;Last full + the latest differential;Not cleared
Synthetic full;Built from a full + incrementals on the backup server;Fast restore, no full read from source;</tb>
<ul>
<li><b>3-2-1 rule</b>: 3 copies, on 2 different media, 1 offsite.</li>
<li><b>GFS</b> rotation: Grandfather (monthly), Father (weekly), Son (daily).</li>
<li>On-site vs off-site vs cloud. <b>Test restores</b> regularly. Backups are useless until a restore is proven.</li>
<li><b>Recovery</b>: in-place/overwrite vs alternative location restore.</li>
</ul>
<k>Fastest backup each day = incremental. Fastest restore (of the two) = differential (only full + one differential). Archive bit: cleared by full and incremental.</k>`,
  map: ['Operational procedures 1', '', [
    ['Tickets', '', [['user/device info', ''], ['severity/priority', ''], ['clear notes', 'problem, progress, resolution'], ['escalation tiers', 'SLA']]],
    ['Docs', '', [['KB', ''], ['incident report', ''], ['SOP', ''], ['on/offboarding', ''], ['AUP', ''], ['diagrams', '']]],
    ['Assets', '', [['tags, inventory', ''], ['CMDB', ''], ['warranty, licensing', ''], ['lifecycle', '']]],
    ['Change mgmt', '', [['request, purpose, scope', ''], ['risk analysis', ''], ['CAB approval', ''], ['rollback plan, sandbox', ''], ['user acceptance', '']]],
    ['Backups', '', [['full', ''], ['incremental', 'since last any'], ['differential', 'since last full'], ['synthetic', ''], ['3-2-1, GFS', ''], ['test restores', '']]]
  ]],
  cards: `Incremental backup | Copies changes since the last backup of any type, clears archive bit
Differential backup | Copies changes since the last full, does not clear archive bit
Restore from incrementals needs | Last full + every incremental since
Restore from differentials needs | Last full + latest differential
Synthetic full | Full built on the backup server from previous full + incrementals
3-2-1 rule | 3 copies, 2 media types, 1 offsite
GFS rotation | Grandfather (monthly), Father (weekly), Son (daily)
CAB | Change Advisory Board that approves changes
Rollback plan | Steps to undo a change if it fails
Sandbox testing | Test a change in an isolated environment first
SOP | Standard operating procedure
AUP | Acceptable use policy
CMDB | Configuration management database of assets and relationships
SLA | Service level agreement: response/resolution targets
Offboarding | Disable accounts, collect equipment, transfer data
Knowledge base | Searchable library of known fixes`,
  ex: [
    ['m', 'Which backup type takes the least time each night but requires the most media sets to restore?', ['Incremental', 'Differential', 'Full', 'Synthetic full'], 'Incremental: fastest backup, slowest restore.'],
    ['m', 'A full backup runs Sunday and differentials run Monday–Friday. The server fails Thursday morning. What is needed to restore?', ['Sunday full + Wednesday differential', 'Sunday full + Mon, Tue, Wed differentials', 'Only Wednesday differential', 'Sunday full only'], 'Differential = last full + latest differential.'],
    ['m', 'A full backup runs Sunday and incrementals Monday–Friday. Failure on Thursday morning. What is needed?', ['Sunday full + Mon, Tue and Wed incrementals', 'Sunday full + Wed incremental', 'Wednesday incremental only', 'Sunday full only'], 'Every incremental since the full.'],
    ['m', 'Which rule describes keeping three copies of data on two types of media with one offsite?', ['3-2-1', 'GFS', 'RAID 5', 'Least privilege'], '3-2-1.'],
    ['m', 'Which group approves normal changes in the change management process?', ['Change Advisory Board (CAB)', 'Help desk tier 1', 'End users', 'The vendor'], 'CAB.'],
    ['m', 'Before a firewall upgrade, the plan must include steps to restore the old config if it fails. This is the:', ['Rollback (backout) plan', 'Risk analysis', 'Scope', 'AUP'], 'Rollback plan.'],
    ['m', 'Where should a change be tested before going to production?', ['Sandbox / test environment', 'The CEO\'s laptop', 'Production during business hours', 'A user\'s home PC'], 'Sandbox testing.'],
    ['m', 'An employee leaves the company. Which document guides disabling accounts and collecting equipment?', ['Offboarding checklist', 'Onboarding checklist', 'Network diagram', 'SLA'], 'Offboarding.'],
    ['m', 'A technician wants other techs to fix a recurring Outlook issue faster. Create a:', ['Knowledge base article', 'Incident report', 'AUP', 'Change request'], 'KB article.'],
    ['m', 'Which ticket note is BEST written?', ['"User could not print to HR-PR01. Print spooler stopped. Restarted spooler, test page OK, user confirmed."', '"Fixed it."', '"Printer bad."', '"Did stuff, works now."'], 'Clear problem, action, resolution.'],
    ['m', 'Which backup type does NOT reset the archive bit?', ['Differential', 'Incremental', 'Full', 'Synthetic full'], 'Differential leaves the bit set so each one grows.'],
    ['mm', 'Which TWO items belong in a change request? (Choose two.)', ['Risk analysis', 'Rollback plan', 'User\'s favourite colour', 'Home address of the CAB', 'Monitor model'], 'Scope, purpose, risk, rollback, schedule, affected systems.'],
    ['f', 'In GFS rotation, the daily backup is the ___.', ['son'], 'Son = daily, Father = weekly, Grandfather = monthly.'],
    ['f', 'The database that tracks IT assets and their relationships is the ___.', ['CMDB', 'configuration management database'], 'CMDB.'],
    ['s', 'Order these change management activities.', ['Submit the change request with purpose and scope', 'Perform risk analysis', 'Get CAB approval', 'Test in a sandbox and prepare rollback', 'Implement in the maintenance window', 'Document the change'], 'Request, risk, approval, test, implement, document.'],
    ['x', 'Match the document to its purpose.', [['SOP', 'Steps for a routine task'], ['AUP', 'Rules for using company systems'], ['Incident report', 'Record of a security event and response'], ['Network diagram', 'Map of devices and links'], ['SLA', 'Agreed response and resolution times']], 'Documentation types.'],
    ['t', 'A backup has not proven itself until a test restore succeeds.', true, 'Test restores regularly.']
  ]
},
{
  day: 26, exam: 2, dom: '4.0', title: 'Safety, environment, privacy, licensing and professionalism', obj: '220-1202 · 4.0 safety procedures · environmental impacts · privacy, licensing, policy · communication and professionalism', deck: 'd26',
  goals: ['Apply ESD, electrical, lifting and fire safety', 'Handle environmental controls and disposal (batteries, toner, CRTs)', 'Handle prohibited content, chain of custody, PII/PCI/PHI and licensing', 'Communicate professionally with customers'],
  concept: `
<h3>Safety</h3>
<tb>Topic;Know this
ESD;Antistatic wrist strap (connected to ground), ESD mat, antistatic bags, touch unpainted metal to self-ground, low humidity increases static
Electrical;Unplug before working, never open PSUs or CRTs, equipment grounding, remove jewellery
Lifting;Lift with your legs, keep back straight, get help or a cart for heavy items (follow weight limits)
Fire;Class C extinguisher (or ABC) for electrical fires. Never water. CO2 is common for electronics
Cable management;Avoid trip hazards
Personal safety;Safety goggles, air filter mask (toner, dust), compliance with government regulations
Local regulations;OSHA (US) / provincial WorkSafeBC etc.</tb>
<h3>Environmental</h3>
<ul>
<li><b>SDS</b> (Safety Data Sheet, formerly MSDS): handling, storage, disposal, first aid for chemicals such as toner, batteries, cleaning solutions.</li>
<li><b>Temperature, humidity and ventilation</b>: data rooms 18–27 °C. High humidity = condensation/corrosion. Low = ESD. Location away from windows/heat.</li>
<li><b>Power</b>: <b>UPS</b> (battery, clean shutdown during outage), <b>surge suppressor</b> (spikes), line conditioners (brownouts, sags). Battery backup sizing.</li>
<li><b>Disposal</b>: batteries, toner, CRT monitors, mobile devices go to proper recycling per local regulations, never regular trash. Toner cartridges can be recycled by manufacturer.</li>
<li>Dust: compressed air, ESD-safe vacuum, enclosures/air filters.</li>
</ul>
<h3>Privacy, licensing, policies</h3>
<tb>Topic;Know this
Incident response;Identify, report through proper channels, preserve data/devices, document, chain of custody
Chain of custody;Log of who handled evidence, when, and why. Keeps it admissible
Prohibited content;Don't investigate yourself beyond your role. Report to management/security, preserve evidence
Data types;PII (personal), PCI DSS (card data), PHI (health), GDPR (EU privacy), data retention requirements
Licensing;DRM, EULA, personal vs corporate licences, open-source (GPL etc.), commercial, subscription vs perpetual, valid licences
Data handling;Data classification, retention policies, regulated data</tb>
<h3>Communication and professionalism</h3>
<ul>
<li>Arrive on time, dress appropriately (formal / business casual), use proper language (no jargon or slang), positive attitude, project confidence.</li>
<li><b>Actively listen</b>, take notes, don't interrupt. Clarify by restating the issue. Ask open-ended questions to narrow scope.</li>
<li>Be culturally sensitive (use titles where appropriate). Avoid distractions: personal calls, texting, social media, talking to coworkers, personal interruptions.</li>
<li>Difficult customers: don't argue or be defensive, don't dismiss problems, avoid judgmental comments, clarify expectations. Don't post about it on social media.</li>
<li>Set and meet expectations and timeline; communicate status. Offer repair/replace options. Provide documentation. Follow up to verify satisfaction.</li>
<li>Deal appropriately with confidential/private materials on desks, printers, screens.</li>
</ul>`,
  map: ['Operational procedures 2', '', [
    ['Safety', '', [['ESD strap + mat', ''], ['unplug, no jewellery', ''], ['lift with legs', ''], ['class C / CO2', 'electrical fire']]],
    ['Environment', '', [['SDS', 'chemicals'], ['temp/humidity', ''], ['UPS / surge', ''], ['recycle batteries, toner', '']]],
    ['Privacy & legal', '', [['chain of custody', ''], ['report prohibited content', ''], ['PII, PCI, PHI, GDPR', ''], ['EULA, DRM, open source', '']]],
    ['Professionalism', '', [['punctual, proper language', ''], ['active listening', ''], ['no distractions', ''], ['set expectations', ''], ['follow up', '']]]
  ]],
  cards: `SDS | Safety Data Sheet: handling, disposal and first aid for a substance
Antistatic wrist strap | Equalizes static between you and the equipment (ESD)
Fire extinguisher for electrical fires | Class C (or ABC), CO2 common. Never water
UPS | Uninterruptible power supply: battery power during outages for clean shutdown
Surge suppressor | Protects against voltage spikes
Low humidity risk | Increased ESD
High humidity risk | Condensation and corrosion
Chain of custody | Documented record of who handled evidence and when
PII | Personally identifiable information
PHI | Protected health information
PCI DSS | Payment card data security standard
GDPR | EU data privacy regulation
EULA | End-user license agreement
Open-source license | Source code available, use/modify under its terms
Proper lifting | Bend knees, lift with legs, keep back straight
Disposal of batteries/toner | Recycle per local regulations, never regular trash`,
  ex: [
    ['m', 'Which extinguisher should be used on a burning server rack?', ['Class C (CO2 or ABC)', 'Water (Class A)', 'Class K', 'Foam only'], 'Electrical fires need non-conductive agents.'],
    ['m', 'Where can a technician find how to safely handle and dispose of a toner product?', ['Its Safety Data Sheet (SDS)', 'The EULA', 'The ticket system', 'The AUP'], 'SDS.'],
    ['m', 'While repairing a PC, a technician finds illegal images. What should they do FIRST?', ['Stop, do not tamper with the device, and report through proper channels', 'Delete the files', 'Confront the user', 'Copy the files to a USB drive as evidence'], 'Preserve and report. Follow the incident response process.'],
    ['m', 'A seized laptop is handed from IT to legal to law enforcement. What ensures the evidence stays admissible?', ['Chain of custody documentation', 'An AUP', 'A UPS', 'An SLA'], 'Chain of custody.'],
    ['m', 'The server room keeps losing power for a few seconds, corrupting data. Install a:', ['UPS', 'Surge suppressor only', 'Larger PSU', 'KVM switch'], 'UPS provides battery power during outages.'],
    ['m', 'A technician is in a very dry winter office replacing RAM. Which risk is increased?', ['ESD', 'Corrosion', 'Condensation', 'Overvoltage'], 'Low humidity increases static.'],
    ['m', 'How should a box of old laptop batteries be disposed of?', ['Recycle according to local hazardous waste regulations', 'Regular trash', 'Burn them', 'Store them in the server room'], 'Batteries are hazardous waste.'],
    ['m', 'A customer is angry that their laptop is not fixed yet. BEST response?', ['Listen without interrupting, acknowledge, and give a clear timeline', 'Explain that it is not your fault', 'Tell them to call back later', 'Use technical terms to show expertise'], 'Stay calm, empathize, set expectations.'],
    ['m', 'While on a service call, the technician\'s personal phone rings. They should:', ['Ignore it until the job is done (unless an emergency)', 'Answer it in front of the customer', 'Text back immediately', 'Leave to take the call'], 'Avoid personal interruptions.'],
    ['m', 'A technician sees a document with salaries on the printer at a customer site. What should they do?', ['Leave it alone and not read or share it', 'Read it to understand the business', 'Take a photo', 'Hand it to the nearest employee'], 'Respect confidential materials.'],
    ['m', 'Data containing patients\' diagnoses is classified as:', ['PHI', 'PCI', 'Open source', 'Public'], 'Protected health information.'],
    ['mm', 'Which TWO are proper ESD precautions? (Choose two.)', ['Wear a wrist strap connected to ground', 'Store parts in antistatic bags', 'Work on carpet in socks', 'Hold components by the gold contacts', 'Keep the humidity as low as possible'], 'Strap and antistatic bags.'],
    ['f', 'Card payment data is governed by the ___ standard.', ['PCI DSS', 'PCI', 'pci-dss'], 'PCI DSS.'],
    ['f', 'Electrical fires should be fought with a Class ___ extinguisher.', ['C'], 'Class C.'],
    ['x', 'Match the item to the protection it provides.', [['UPS', 'Battery power during outages'], ['Surge suppressor', 'Protection from spikes'], ['ESD mat', 'Static discharge control'], ['SDS', 'Chemical handling information'], ['Chain of custody form', 'Evidence handling record']], 'Safety and environment.'],
    ['t', 'Using a corporate licence of an application on a personal home PC is always allowed.', false, 'Licensing terms (EULA) define where software may be installed.'],
    ['m', 'Which question is BEST to clarify a vague customer complaint?', ['"Can you walk me through what happens when you try to print?"', '"Did you break it?"', '"Is it plugged in, yes or no?"', '"Why didn\'t you call sooner?"'], 'Open-ended questions gather detail.']
  ]
},
{
  day: 27, exam: 2, dom: '4.0', title: 'Scripting, remote access and AI basics', obj: '220-1202 · 4.0 basics of scripting · remote access technologies · artificial intelligence concepts', deck: 'd27',
  goals: ['Identify script file types and what scripts are used for', 'Know scripting risks', 'Compare remote access tools and their security', 'Explain AI concepts: appropriate use, limitations, privacy'],
  concept: `
<h3>Script file types</h3>
<tb>Extension;Language;Platform
.bat;Batch;Windows command prompt
.ps1;PowerShell;Windows (and cross-platform PowerShell 7)
.vbs;VBScript;Windows (legacy)
.sh;Shell script (Bash);Linux/macOS
.js;JavaScript;Browsers, Node.js, Windows Script Host
.py;Python;Cross-platform</tb>
<h3>Use cases</h3>
<p>Basic automation, restarting machines, remapping network drives, installing applications, automated backups, gathering information/data, initiating updates, deploying configs.</p>
<h3>Risks</h3>
<ul>
<li>Unintentionally introducing malware (downloaded scripts).</li>
<li>Inadvertently changing system settings.</li>
<li>Browser or system crashes due to mishandling of resources (infinite loops, memory).</li>
<li>Mitigate: test in a sandbox, code review, signed scripts, PowerShell execution policy, least privilege.</li>
</ul>
<n>Script building blocks you may see: variables, loops (repeat), conditionals (if/else), comments (# in PowerShell/Bash/Python, REM or :: in batch, ' in VBScript, // in JS), environment variables.</n>
<h3>Remote access technologies</h3>
<tb>Tool;Notes
RDP;Windows Remote Desktop, TCP/UDP 3389. Use with VPN or RD Gateway, never exposed directly to the internet. Network Level Authentication
VPN;Encrypted tunnel for remote users/sites
VNC;Cross-platform remote desktop (5900). Weak by default, tunnel it
SSH;Secure shell (22) for command-line management
RMM;Remote monitoring and management tools used by MSPs (patching, scripting, alerts)
Remote assistance / screen sharing;Windows Quick Assist, Remote Assistance, third-party (TeamViewer etc.), video conferencing
Desktop management / MDM;Manage endpoints remotely
Simultaneous file transfer, videoconferencing;</tb>
<t>Security for remote access: MFA, strong passwords, least privilege, logging, VPN in front, patching, and user consent for screen sharing. Tech-support scammers abuse remote tools: never let unsolicited callers connect.</t>
<h3>Artificial intelligence basics</h3>
<ul>
<li><b>Application integration</b>: AI built into productivity tools, help desks, search.</li>
<li><b>Policy</b>: follow your organisation's appropriate use policy. Use approved tools only.</li>
<li><b>Data security</b>: don't paste confidential data, PII, credentials or source code into public AI tools. Public vs private (enterprise) AI instances.</li>
<li><b>Limitations</b>: <b>hallucinations</b> (confident but wrong output), <b>bias</b> from training data, accuracy issues. Verify output before acting on it.</li>
<li><b>Privacy and IP</b>: data may be retained or used for training. Consider intellectual property and plagiarism concerns.</li>
</ul>`,
  map: ['Scripting, remote, AI', '', [
    ['Scripts', '', [['.bat', 'batch'], ['.ps1', 'PowerShell'], ['.vbs', 'VBScript'], ['.sh', 'Bash'], ['.js', 'JavaScript'], ['.py', 'Python']]],
    ['Uses', '', [['automation', ''], ['map drives', ''], ['install apps', ''], ['backups, updates', '']]],
    ['Risks', '', [['malware', ''], ['settings changes', ''], ['crashes', 'resource leaks']]],
    ['Remote', '', [['RDP 3389', 'behind VPN'], ['VPN', ''], ['VNC 5900', ''], ['SSH 22', ''], ['RMM', 'MSPs'], ['screen share', 'consent']]],
    ['AI', '', [['appropriate use policy', ''], ['no sensitive data in public AI', ''], ['hallucinations, bias', 'verify'], ['privacy, IP', '']]]
  ]],
  cards: `.bat | Windows batch script
.ps1 | PowerShell script
.vbs | VBScript
.sh | Linux/macOS shell script
.js | JavaScript
.py | Python script
Script risk | Can introduce malware, change settings, or crash systems
RMM | Remote monitoring and management platform (MSPs)
VNC port | 5900
RDP best practice | Put it behind a VPN or gateway with MFA, never directly on the internet
Quick Assist | Windows built-in remote help tool
AI hallucination | Confident but incorrect AI output
AI bias | Skewed output caused by training data
Public AI data risk | Confidential data may be retained or used for training`,
  ex: [
    ['m', 'Which file extension is a PowerShell script?', ['.ps1', '.bat', '.vbs', '.sh'], '.ps1.'],
    ['m', 'Which script type would a Linux admin use to automate nightly backups?', ['.sh', '.ps1', '.bat', '.vbs'], 'Shell script.'],
    ['m', 'A technician runs a script downloaded from a forum and the PC starts behaving oddly. Which scripting risk occurred?', ['Unintentionally introducing malware', 'Licensing violation', 'ESD damage', 'DNS poisoning'], 'Untrusted scripts can carry malware.'],
    ['m', 'Which is the BEST way to give staff secure remote access to their office desktops via RDP?', ['Require a VPN (or RD Gateway) with MFA before RDP', 'Forward port 3389 on the router to every PC', 'Disable Network Level Authentication', 'Use Telnet instead'], 'Never expose RDP directly.'],
    ['m', 'An MSP patches and monitors hundreds of client PCs from one console. Which tool type?', ['RMM', 'VNC', 'KVM', 'SDS'], 'Remote monitoring and management.'],
    ['m', 'A caller says they are from "Microsoft" and asks to connect to the user\'s PC to remove viruses. What should the user do?', ['Refuse and hang up, then report it', 'Allow the connection', 'Give them the admin password', 'Install the tool they suggest'], 'Classic tech-support scam.'],
    ['m', 'Which cross-platform remote desktop protocol uses port 5900?', ['VNC', 'RDP', 'SSH', 'Telnet'], 'VNC.'],
    ['m', 'An employee wants to paste customer records into a public AI chatbot to summarise them. What is the main concern?', ['Data privacy: confidential data may be stored or used for training', 'The chatbot will be too slow', 'It will break the keyboard', 'It needs a GPU'], 'Don\'t put sensitive data in public AI tools.'],
    ['m', 'An AI assistant gives a confident but incorrect command for a server. This is called:', ['A hallucination', 'Bias', 'Phishing', 'A zero-day'], 'Hallucination.'],
    ['m', 'Which script use case would remap network drives at sign-in?', ['A login script', 'A BIOS update', 'A UPS test', 'A degausser'], 'Login scripts map drives/printers.'],
    ['mm', 'Which TWO reduce scripting risk? (Choose two.)', ['Test scripts in a sandbox first', 'Use only signed/approved scripts', 'Run every script as domain admin', 'Disable antivirus while scripting', 'Download scripts from random forums'], 'Sandbox + signing/approval.'],
    ['f', 'A Windows batch file has the extension ___.', ['.bat', 'bat', '.cmd'], '.bat (or .cmd).'],
    ['f', 'Python scripts use the extension ___.', ['.py', 'py'], '.py.'],
    ['x', 'Match the extension to the language.', [['.ps1', 'PowerShell'], ['.sh', 'Bash shell'], ['.vbs', 'VBScript'], ['.js', 'JavaScript'], ['.py', 'Python'], ['.bat', 'Windows batch']], 'Script types.'],
    ['t', 'AI output can contain bias inherited from its training data.', true, 'Verify and review AI output.'],
    ['m', 'Which built-in Windows tool lets a help desk tech view and control a user\'s screen with the user\'s permission?', ['Quick Assist', 'Event Viewer', 'msconfig', 'Disk Cleanup'], 'Quick Assist / Remote Assistance.']
  ]
},
{
  day: 28, exam: 2, dom: '4.0', title: 'Core 2 review and full mock exam', obj: '220-1202 · all domains · cram sheet + 90-question mock', deck: 'd28', mock: 'c2',
  goals: ['Close your weakest Core 2 domain', 'Take the full timed Core 2 mock', 'Decide whether to book 220-1202'],
  concept: `
<h3>Today's plan</h3>
<ol>
<li>Open <b>Me</b> → Core 2 by domain. Run one domain quiz for the lowest one.</li>
<li>Read the cram sheet out loud.</li>
<li>Take the <b>Core 2 full mock</b>: 90 questions, 90 minutes. Pass = 700.</li>
<li>Work the gap report, retry misses, re-read those lessons. Re-take a Core 1 mock this week so it stays fresh.</li>
</ol>
<h3>Core 2 cram sheet</h3>
<tb>Topic;Must-know facts
Editions;Home: no domain, no BitLocker, no gpedit, no RDP host. Pro: all of those
File systems;NTFS perms · FAT32 4 GB file limit · exFAT big files cross-platform · ext4/XFS Linux · APFS macOS
Partitions;MBR 2 TB / 4 primary / BIOS · GPT UEFI
Tools;eventvwr · devmgmt · diskmgmt · taskschd · lusrmgr · perfmon · services · msconfig · msinfo32 · resmon · regedit · cleanmgr · dxdiag · mstsc
Commands;ipconfig /all /renew /flushdns · tracert · nslookup · netstat · net use · sfc /scannow · DISM · chkdsk /f /r · robocopy · diskpart · gpupdate /force · gpresult /r
Linux;ls, pwd, grep, find, chmod 755, chown, sudo, apt/dnf, ps/top, kill, df/du
macOS;Time Machine, FileVault, Keychain, Spotlight, Mission Control, Cmd+Opt+Esc
Security;Least privilege · zero trust · MFA factors · vestibule vs tailgating · RADIUS / TACACS+ / Kerberos
Wi-Fi;WEP broken · TKIP weak · WPA2-AES · WPA3-SAE best · Enterprise = 802.1X
Malware removal;Investigate · Quarantine · Disable SR · Remediate (update, scan) · Schedule · Enable SR · Educate
Permissions;Share + NTFS = most restrictive · Deny wins · move same volume keeps
Destruction;Shred/drill/incinerate + certificate · degauss HDD only · secure erase to reuse
SOHO;Change default creds, update firmware, WPA3, disable WPS/UPnP, guest net, port forward only what's needed
Troubleshooting;Least invasive first · roll back recent change · Safe Mode · System Restore keeps files
Backups;Incremental since last any · Differential since last full · 3-2-1 · GFS · test restores
Change mgmt;Request, purpose, scope, risk, CAB, rollback, sandbox, user acceptance
Safety;Class C fire · SDS · UPS · ESD strap · lift with legs
Scripts;.bat .ps1 .vbs .sh .js .py
AI;Policy, no sensitive data in public AI, hallucinations, bias</tb>
<k>Booking rule: two Core 2 mocks at 750+ on different days, every domain 75%+. Then book 220-1202.</k>`,
  map: ['Core 2 at a glance', '220-1202', [
    ['1.0 OS 28%', '', [['editions, install', ''], ['tools, commands', ''], ['networking', ''], ['macOS, Linux', '']]],
    ['2.0 Security 28%', '', [['physical, logical', ''], ['AD, AAA', ''], ['Wi-Fi, malware', ''], ['social engineering', ''], ['hardening, destruction', ''], ['mobile, SOHO, browser', '']]],
    ['3.0 SW Troubleshooting 23%', '', [['Windows', ''], ['mobile', ''], ['security symptoms', '']]],
    ['4.0 Op Procedures 21%', '', [['docs, tickets, assets', ''], ['change mgmt, backups', ''], ['safety, environment', ''], ['privacy, professionalism', ''], ['scripting, remote, AI', '']]]
  ]],
  cards: `Core 2 pass mark | 700 / 900
Core 2 biggest domains | Operating Systems and Security (28% each)
Malware removal mnemonic | Investigate, Quarantine, Disable SR, Remediate, Schedule, Enable SR, Educate
Share Read + NTFS Full | Read over the network
Best Wi-Fi security | WPA3 (SAE), Enterprise with 802.1X/RADIUS`,
  ex: [
    ['m', 'Which Windows edition is the minimum that can join a domain and use BitLocker?', ['Pro', 'Home', 'Home N', 'S mode'], 'Pro.'],
    ['m', 'A user\'s PC has malware. The technician has quarantined it. What is NEXT?', ['Disable System Restore', 'Educate the user', 'Schedule scans', 'Enable System Restore'], 'Step 3.'],
    ['m', 'Which command repairs protected Windows system files?', ['sfc /scannow', 'gpupdate /force', 'ipconfig /flushdns', 'netstat -an'], 'SFC.'],
    ['m', 'Which file system should be used on a USB drive shared between a Mac and a PC for 10 GB video files?', ['exFAT', 'FAT32', 'NTFS', 'APFS'], 'exFAT.'],
    ['m', 'Share permission is Change and NTFS permission is Read. What is the effective network access?', ['Read', 'Change', 'Full Control', 'None'], 'Most restrictive.'],
    ['m', 'A visitor slips through a secure door behind an employee unnoticed. Which control prevents this?', ['Access control vestibule', 'Privacy filter', 'Bollard', 'Degausser'], 'Vestibule.'],
    ['m', 'Which backup scheme needs only the last full and the most recent backup to restore?', ['Full + differential', 'Full + incremental', 'Incremental only', 'Synthetic incremental'], 'Differential.'],
    ['m', 'Which extinguisher class is used for electrical fires?', ['C', 'A', 'B only', 'K'], 'Class C.'],
    ['mm', 'Which TWO should be disabled on a SOHO router to improve security? (Choose two.)', ['WPS', 'UPnP', 'WPA3', 'Firewall', 'Firmware updates'], 'WPS and UPnP.'],
    ['m', 'Which macOS tool provides full-disk encryption?', ['FileVault', 'Time Machine', 'Keychain', 'Spotlight'], 'FileVault.'],
    ['m', 'Which Linux command changes file permissions?', ['chmod', 'chown', 'grep', 'ps'], 'chmod.'],
    ['f', 'The Windows command that shows applied Group Policy is gpresult ___.', ['/r'], 'gpresult /r.'],
    ['f', 'PowerShell scripts use the ___ extension.', ['.ps1', 'ps1'], '.ps1.'],
    ['x', 'Match the attack to the defence.', [['Tailgating', 'Access control vestibule'], ['Shoulder surfing', 'Privacy screen'], ['Dumpster diving', 'Shredding'], ['Phishing', 'User training and email filtering'], ['Brute force', 'Account lockout']], 'Defence matching.'],
    ['t', 'Degaussing is an effective way to sanitize SSDs.', false, 'Degaussing works on magnetic media only.'],
    ['m', 'A BSOD started after a Windows update. Least invasive FIRST step?', ['Uninstall/roll back the update (Safe Mode or WinRE)', 'Reset this PC', 'Replace RAM', 'Reimage'], 'Undo the recent change.']
  ]
}
);
