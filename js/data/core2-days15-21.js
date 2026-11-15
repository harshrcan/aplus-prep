/* Core 2 lessons, days 15 to 21 */
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(
{
  day: 15, exam: 2, dom: '1.0', title: 'Windows editions, installation, upgrades and file systems', obj: '220-1202 · 1.0 OS types, Windows editions, installation and upgrade methods, partitions and file systems', deck: 'd15',
  goals: ['Choose the right Windows 10/11 edition for a feature', 'Pick an installation or upgrade method and boot source', 'Compare NTFS, FAT32, exFAT, ReFS, ext4, XFS, APFS', 'Explain GPT vs MBR and partitioning'],
  concept: `
<h3>Windows editions (feature differences that get tested)</h3>
<tb>Feature;Home;Pro;Pro for Workstations;Enterprise
Join a domain / Entra ID;No;Yes;Yes;Yes
Group Policy Editor (gpedit.msc);No;Yes;Yes;Yes
BitLocker;No (device encryption only);Yes;Yes;Yes
Remote Desktop host (RDP in);No (client only);Yes;Yes;Yes
Hyper-V;No;Yes;Yes;Yes
Max RAM (64-bit);128 GB;2 TB;6 TB;6 TB
Licensing;Retail/OEM;Retail/OEM/volume;Retail/OEM;Volume</tb>
<t>Home can <b>connect to</b> a remote desktop but cannot <b>host</b> one. Home cannot join a domain or use BitLocker/gpedit. Upgrade the edition (Home → Pro) to get them.</t>
<p>Other OS types: Windows, macOS, Linux distros (desktop/server), ChromeOS (cloud-centric), iOS/iPadOS, Android. Vendor lifecycle: end-of-life (EOL) = no more security updates.</p>
<h3>Installation methods and boot sources</h3>
<tb>Item;Notes
Boot media;USB flash drive, optical, network (PXE), internal recovery partition, external drive
Clean install;Fresh install, wipes partition. Best for problems or new drive
In-place upgrade;Keeps apps, files, settings (e.g. Win 10 → 11)
Image deployment;Capture a reference image and deploy to many PCs (WDS, MDT, Intune Autopilot)
Remote / network install;PXE boot from a deployment server
Zero-touch / Autopilot;Device pulls config from the cloud on first boot
Recovery partition;Vendor reset to factory image
Repair installation;Fixes system files while keeping data
Multiboot;Several OSs on separate partitions</tb>
<p>Before installing: check hardware compatibility, back up data, have product key, drivers, and check application compatibility. 32-bit OS limits RAM to ~4 GB.</p>
<h3>Partitioning</h3>
<tb>;MBR;GPT
Firmware;Legacy BIOS;UEFI
Max disk;2 TB;Huge (9.4 ZB)
Partitions;4 primary (or 3 + extended with logical);128 in Windows</tb>
<h3>File systems</h3>
<tb>FS;Used by;Notes
NTFS;Windows;Permissions, encryption (EFS), compression, quotas, journaling, large files
FAT32;Everything;4 GB max file size, 32 GB format limit in Windows tools. USB/SD compatibility
exFAT;Flash drives;No 4 GB file limit, Windows + macOS read/write
ReFS;Windows Server / Storage Spaces;Resilient, self-healing
ext4;Linux;Default on many distros, journaling
XFS;Linux;High-performance, large files (RHEL default)
APFS;macOS;Apple File System, SSD-optimised, snapshots, encryption
HFS+;Older macOS;Mac OS Extended</tb>
<n>Need a USB drive for files over 4 GB that works on Mac and Windows? <b>exFAT</b>. Need Windows permissions? <b>NTFS</b>.</n>
<h3>Upgrade considerations</h3>
<p>Check Windows 11 requirements (TPM 2.0, Secure Boot, supported CPU, 4 GB RAM, 64 GB). Run a compatibility check. Back up user data. Have a rollback plan (Windows keeps <f>Windows.old</f> for ~10 days). Updates: feature updates (annual) vs quality updates (monthly).</p>`,
  map: ['Windows install', '', [
    ['Editions', '', [['Home', 'no domain, no BitLocker, no RDP host, no gpedit'], ['Pro', 'domain, BitLocker, RDP, Hyper-V'], ['Enterprise', 'volume licensing']]],
    ['Install types', '', [['clean', 'wipe'], ['in-place upgrade', 'keep apps/files'], ['image deploy', 'many PCs'], ['PXE / zero-touch', 'network'], ['recovery partition', '']]],
    ['Partitions', '', [['MBR', 'BIOS, 2 TB, 4 primary'], ['GPT', 'UEFI, 128 partitions']]],
    ['File systems', '', [['NTFS', 'Windows perms'], ['FAT32', '4 GB file limit'], ['exFAT', 'big files, cross-platform'], ['ext4 / XFS', 'Linux'], ['APFS', 'macOS']]]
  ]],
  cards: `Windows edition that can't join a domain | Home
Edition needed for BitLocker | Pro (or Enterprise/Education)
gpedit.msc availability | Pro and above, not Home
RDP host on Windows Home? | No. Home is client only
Windows 11 Pro max RAM | 2 TB
Clean install | Fresh OS install that wipes the partition
In-place upgrade | Upgrades OS keeping apps, files and settings
PXE | Preboot Execution Environment, network boot for installs
MBR limits | 2 TB disks, 4 primary partitions, legacy BIOS
GPT | UEFI partition table, huge disks, up to 128 partitions in Windows
NTFS | Windows FS: permissions, EFS, compression, quotas
FAT32 | Max 4 GB per file, widely compatible
exFAT | Flash FS, no 4 GB file limit, Windows + macOS
ext4 | Common Linux file system
XFS | High-performance Linux file system
APFS | Apple File System (macOS, SSD-optimized)
ReFS | Resilient File System for Windows Server / Storage Spaces
Windows.old | Previous install kept after upgrade for rollback`,
  ex: [
    ['m', 'A small business user on Windows 11 Home must join the company domain. What should the technician do?', ['Upgrade to Windows 11 Pro', 'Enable BitLocker', 'Install Hyper-V', 'Create a local admin account'], 'Home cannot join a domain.'],
    ['m', 'A user wants to connect TO their Windows 11 Home desktop remotely using RDP. Why does it fail?', ['Home cannot act as an RDP host', 'Port 22 is blocked', 'Home lacks a TPM', 'RDP needs Linux'], 'Home only includes the Remote Desktop client.'],
    ['m', 'Which file system supports files larger than 4 GB and works on both macOS and Windows without extra software?', ['exFAT', 'FAT32', 'NTFS', 'ext4'], 'exFAT is the cross-platform flash file system.'],
    ['m', 'A 6 GB video will not copy to a USB drive with plenty of free space. MOST likely cause?', ['The drive is formatted FAT32', 'The drive is NTFS', 'The drive is exFAT', 'The USB port is 2.0'], 'FAT32 has a 4 GB single-file limit.'],
    ['m', 'Which partition style is required to boot a 4 TB drive with UEFI?', ['GPT', 'MBR', 'Extended', 'Dynamic only'], 'MBR tops out at 2 TB.'],
    ['m', 'An organisation needs to install the same configured Windows build on 200 new PCs. BEST method?', ['Image deployment (e.g. WDS / MDT / Autopilot)', 'Manual clean install on each', 'In-place upgrade', 'Recovery partition'], 'Imaging scales.'],
    ['m', 'A user wants Windows 11 but keep all apps and files. Which method?', ['In-place upgrade', 'Clean install', 'Format and reinstall', 'Multiboot'], 'In-place upgrades keep apps, settings and data.'],
    ['m', 'Which file system is the default on modern macOS?', ['APFS', 'HFS+', 'NTFS', 'ext4'], 'Apple File System.'],
    ['mm', 'Which TWO features are NOT available in Windows 11 Home? (Choose two.)', ['BitLocker', 'Group Policy Editor', 'Microsoft Store', 'Windows Defender', 'Wi-Fi'], 'Home lacks BitLocker and gpedit (it has device encryption on some hardware).'],
    ['m', 'Which boot method installs Windows over the network with no local media?', ['PXE', 'USB', 'Optical', 'Recovery partition'], 'Preboot Execution Environment.'],
    ['m', 'Which Linux file system is a common default for RHEL and handles very large files well?', ['XFS', 'FAT32', 'APFS', 'NTFS'], 'XFS (ext4 is also common).'],
    ['f', 'MBR disks support a maximum of ___ primary partitions.', ['4', 'four'], '4 primary, or 3 + 1 extended with logical drives.'],
    ['f', 'After an upgrade, the previous Windows installation is kept in the folder ___.', ['Windows.old', 'C:\\Windows.old', 'windows.old'], 'Used to roll back.'],
    ['x', 'Match the file system to where it is used.', [['NTFS', 'Windows system drives'], ['APFS', 'macOS'], ['ext4', 'Linux'], ['exFAT', 'Large-file USB flash drives'], ['ReFS', 'Windows Server Storage Spaces']], 'File system by platform.'],
    ['t', 'A 32-bit version of Windows can use about 4 GB of RAM at most.', true, '32-bit address space limit.'],
    ['m', 'Before an in-place upgrade, which step is MOST important?', ['Back up user data and check compatibility', 'Format the drive', 'Disable the network adapter', 'Delete the recovery partition'], 'Always back up and verify requirements.']
  ]
},
{
  day: 16, exam: 2, dom: '1.0', title: 'Windows tools: Settings, Control Panel and MMC snap-ins', obj: '220-1202 · 1.0 Microsoft Windows OS features and tools, Control Panel / Settings, system utilities', deck: 'd16',
  goals: ['Pick the right Windows tool for a task', 'Use Task Manager, Event Viewer, Device Manager, Disk Management and Task Scheduler', 'Know msconfig, msinfo32, regedit, resmon, perfmon, dxdiag, cleanmgr', 'Find settings in Control Panel and Settings'],
  concept: `
<h3>Microsoft Management Console snap-ins</h3>
<tb>Tool;Run;Use
Event Viewer;eventvwr.msc;System, Application and Security logs. Find errors behind crashes
Disk Management;diskmgmt.msc;Initialise, partition, format, extend/shrink, assign letters
Task Scheduler;taskschd.msc;Run programs/scripts on a schedule or trigger
Device Manager;devmgmt.msc;Drivers: update, roll back, disable. Yellow ! = problem
Certificate Manager;certmgr.msc;User certificates
Local Users and Groups;lusrmgr.msc;Local accounts and groups (Pro+)
Performance Monitor;perfmon.msc;Counters and logs over time, baselines
Group Policy Editor;gpedit.msc;Local policies (Pro+)
Services;services.msc;Start/stop services, startup type</tb>
<h3>Other utilities</h3>
<tb>Tool;Run;Use
Task Manager;Ctrl+Shift+Esc;Processes, performance, startup apps, users, services. End task
System Information;msinfo32;Hardware/software inventory, BIOS version
Resource Monitor;resmon;Live CPU, memory, disk, network per process
System Configuration;msconfig;Boot options (safe boot), services (startup apps moved to Task Manager)
Disk Cleanup;cleanmgr;Remove temp files, update leftovers
Disk Defragment / Optimize Drives;dfrgui;Defrag HDDs, TRIM SSDs
Registry Editor;regedit;Edit the registry. Back up first
DirectX Diagnostic;dxdiag;Display/sound diagnostics, DirectX version
Remote Desktop Connection;mstsc;RDP client</tb>
<t>Startup programs are managed in <b>Task Manager → Startup apps</b> on Windows 10/11, not msconfig. Safe boot is set in <b>msconfig → Boot</b> (or Shift+Restart → Advanced startup).</t>
<h3>Control Panel and Settings</h3>
<tb>Applet / page;Use
Internet Options;Proxy, security zones, clear cache, reset IE/legacy settings
Devices and Printers;Add printers, devices
Programs and Features;Uninstall, Windows features (e.g. Hyper-V, .NET)
Network and Sharing Center;Adapters, sharing settings, network profile
System;Computer name, domain join, remote settings, advanced system (virtual memory, performance)
Windows Defender Firewall;Allow apps, rules (advanced: wf.msc)
Mail;Outlook profiles
Sound;Playback and recording devices
User Accounts;Account type, UAC settings
Device Manager / Indexing Options / Administrative Tools;
File Explorer Options;Show hidden files, file extensions
Power Options;Sleep, hibernate, power plans, lid action, fast startup, USB selective suspend
Ease of Access;Accessibility</tb>
<p>Settings app pages: Time & Language, Update & Security / Windows Update, Personalization, Apps, Privacy, System, Devices, Network & Internet, Gaming, Accounts.</p>
<n>Power terms: <b>Sleep</b> = RAM stays powered, quick resume. <b>Hibernate</b> = RAM saved to disk (hiberfil.sys), full power off. <b>Fast startup</b> = hybrid shutdown, can hide driver issues.</n>`,
  map: ['Windows tools', '', [
    ['MMC', '', [['eventvwr', 'logs'], ['diskmgmt', 'partitions'], ['taskschd', 'schedule'], ['devmgmt', 'drivers'], ['lusrmgr', 'local users'], ['perfmon', 'counters'], ['services.msc', '']]],
    ['Utilities', '', [['Task Manager', 'processes, startup'], ['msinfo32', 'inventory'], ['resmon', 'live per-process'], ['msconfig', 'safe boot'], ['regedit', 'registry'], ['cleanmgr / dfrgui', '']]],
    ['Control Panel', '', [['Internet Options', 'proxy'], ['Programs and Features', 'uninstall, features'], ['System', 'name, domain, virtual memory'], ['File Explorer Options', 'hidden, extensions'], ['Power Options', 'sleep, hibernate']]]
  ]],
  cards: `eventvwr.msc | Event Viewer: system, application and security logs
diskmgmt.msc | Disk Management: partition, format, extend, letters
taskschd.msc | Task Scheduler
devmgmt.msc | Device Manager: drivers, roll back, disable
lusrmgr.msc | Local Users and Groups
perfmon.msc | Performance Monitor: counters, baselines over time
certmgr.msc | Certificate Manager
gpedit.msc | Local Group Policy Editor (Pro+)
services.msc | Services console
msinfo32 | System Information inventory
resmon | Resource Monitor, live per-process usage
msconfig | System Configuration: boot options, safe boot
regedit | Registry Editor
cleanmgr | Disk Cleanup
dfrgui | Optimize Drives (defrag/TRIM)
dxdiag | DirectX Diagnostic Tool
mstsc | Remote Desktop Connection client
Where to disable startup apps (Win 10/11) | Task Manager → Startup apps
Hibernate | Saves RAM to disk and powers off`,
  ex: [
    ['m', 'Which tool shows the error logged when an application crashed last night?', ['Event Viewer', 'Device Manager', 'Disk Management', 'Task Scheduler'], 'Event Viewer → Application log.'],
    ['m', 'After a driver update, a network card stops working. Which tool lets the technician roll back the driver?', ['Device Manager', 'msconfig', 'Resource Monitor', 'Disk Cleanup'], 'Device Manager → Driver → Roll Back.'],
    ['m', 'A new SSD does not appear in File Explorer. Where should the technician initialise and format it?', ['Disk Management', 'Device Manager', 'Event Viewer', 'msinfo32'], 'New disks must be initialised and partitioned.'],
    ['m', 'A user wants a cleanup script to run every Friday at 5 pm. Use:', ['Task Scheduler', 'Services', 'msconfig', 'Performance Monitor'], 'Task Scheduler runs tasks on triggers.'],
    ['m', 'Where do you disable programs that launch at sign-in on Windows 11?', ['Task Manager → Startup apps', 'msconfig → Startup', 'Device Manager', 'Disk Management'], 'msconfig redirects you to Task Manager on Win 10/11.'],
    ['m', 'Which tool configures Windows to boot into Safe Mode on the next restart?', ['msconfig', 'regedit', 'dxdiag', 'cleanmgr'], 'msconfig → Boot → Safe boot.'],
    ['m', 'A technician needs the BIOS version and installed RAM without opening the case. Use:', ['msinfo32', 'resmon', 'certmgr', 'taskschd'], 'System Information shows hardware/firmware inventory.'],
    ['m', 'Which tool shows live disk and network activity per process?', ['Resource Monitor', 'Event Viewer', 'msinfo32', 'Disk Management'], 'resmon gives per-process detail.'],
    ['m', 'To collect CPU counters over a week to build a performance baseline, use:', ['Performance Monitor', 'Task Manager', 'dxdiag', 'msconfig'], 'perfmon logs counters over time.'],
    ['m', 'A user cannot see file extensions in File Explorer. Where is this changed?', ['File Explorer Options', 'Internet Options', 'System', 'Power Options'], 'View tab → uncheck "Hide extensions".'],
    ['m', 'Which Control Panel applet configures a proxy server for the system/browser?', ['Internet Options', 'Network and Sharing Center', 'Programs and Features', 'Mail'], 'Internet Options → Connections → LAN settings.'],
    ['m', 'To enable the Hyper-V feature, go to:', ['Programs and Features → Turn Windows features on or off', 'Device Manager', 'Disk Management', 'Power Options'], 'Windows Features.'],
    ['mm', 'Which TWO tools are MMC snap-ins? (Choose two.)', ['devmgmt.msc', 'eventvwr.msc', 'msconfig', 'regedit', 'dxdiag'], '.msc files are MMC consoles.'],
    ['f', 'The command to open Disk Management is ___.', ['diskmgmt.msc', 'diskmgmt'], 'diskmgmt.msc.'],
    ['f', 'The Remote Desktop client is launched with ___.', ['mstsc', 'mstsc.exe'], 'Microsoft Terminal Services Client.'],
    ['x', 'Match the task to the tool.', [['Manage local accounts', 'lusrmgr.msc'], ['Edit the registry', 'regedit'], ['Check DirectX/display info', 'dxdiag'], ['Remove temporary files', 'cleanmgr'], ['Change service startup type', 'services.msc'], ['Manage user certificates', 'certmgr.msc']], 'Tool identification is heavily tested.'],
    ['t', 'Hibernate saves the contents of RAM to the disk and powers the system off.', true, 'Sleep keeps RAM powered. Hibernate writes it to hiberfil.sys.'],
    ['m', 'To change the computer name and join a domain, open:', ['System properties (Settings → System → About / sysdm.cpl)', 'Device Manager', 'Internet Options', 'Sound'], 'System properties → Computer Name.']
  ]
},
{
  day: 17, exam: 2, dom: '1.0', title: 'Command line: Windows, Linux and macOS', obj: '220-1202 · 1.0 Windows command-line tools · Linux and macOS commands', deck: 'd17',
  goals: ['Choose the right Windows command and switch for a task', 'Use networking commands to diagnose connectivity', 'Use core Linux/macOS commands for files, permissions, processes and packages', 'Know when a command needs an elevated prompt'],
  concept: `
<h3>Windows: navigation and files</h3>
<tb>Command;Use
cd / dir / md / rmdir;Change directory, list, make dir, remove dir
copy / xcopy / robocopy;Copy files. xcopy copies folders. <b>robocopy</b> = robust, resumable, mirrors (/MIR)
format;Format a drive
diskpart;Partitioning from the command line (list disk, select disk, clean, create partition)
chkdsk;Check disk. <f>/f</f> fixes errors, <f>/r</f> locates bad sectors and recovers
sfc /scannow;System File Checker: repairs protected system files
DISM /Online /Cleanup-Image /RestoreHealth;Repairs the Windows image (run before sfc if sfc fails)
shutdown /s /r /t 0;Shut down, restart, time
winver;Shows Windows version/build
[command] /?;Help for any command</tb>
<h3>Windows: networking</h3>
<tb>Command;Use
ipconfig;IP, mask, gateway. <f>/all</f> (MAC, DNS, DHCP), <f>/release</f>, <f>/renew</f>, <f>/flushdns</f>, <f>/displaydns</f>
ping;Test reachability (ICMP). <f>-t</f> continuous, <f>-n</f> count
tracert;Show each hop to a destination
pathping;Combines ping + tracert with loss per hop
nslookup;Query DNS records and servers
netstat;Active connections and listening ports. <f>-a -n -b</f> (b = owning program, admin)
net use;Map/disconnect network drives: <f>net use Z: \\\\server\\share</f>
net user;Manage local user accounts
hostname;Show computer name
netsh;Configure network settings (e.g. <f>netsh wlan show profiles</f>, winhttp proxy)</tb>
<h3>Windows: policy and accounts</h3>
<tb>Command;Use
gpupdate /force;Re-apply Group Policy now
gpresult /r;Show which policies applied (RSoP)
whoami;Current user (and /groups, /priv)
net user [name] /domain;Look up a domain account</tb>
<t>Run <b>sfc</b>, <b>chkdsk</b>, <b>DISM</b>, <b>diskpart</b>, <b>netstat -b</b> from an <b>elevated (Administrator)</b> prompt.</t>
<h3>Linux / macOS commands</h3>
<tb>Command;Use
ls (-l, -a);List files (long, include hidden)
pwd;Print working directory
cd, mv, cp, rm;Change dir, move/rename, copy, remove (rm -r for folders)
mkdir;Make directory
cat;Show file contents
nano / vi;Text editors
grep;Search text for a pattern
find;Find files by name/attributes
chmod;Change permissions (chmod 755 file, chmod +x script)
chown;Change owner
sudo / su;Run as superuser / switch user
apt / dnf (yum);Package managers: Debian/Ubuntu vs Red Hat/Fedora
ip / ifconfig;Network interfaces (ip addr)
ping, traceroute, dig;Network tests, DNS lookup
ps / top;List processes / live process monitor
kill;End a process by PID
df / du;Disk free / disk usage
man;Manual pages
curl;Transfer data from URLs
history, tail, less;</tb>
<n>chmod numbers: read 4, write 2, execute 1. 755 = owner rwx, group r-x, others r-x. 644 = owner rw-, others r--.</n>
<p>macOS also has: Terminal, Homebrew (<f>brew</f>) package manager, <f>diskutil</f>.</p>`,
  map: ['Command line', '', [
    ['Windows files', '', [['robocopy', 'robust copy, /MIR'], ['chkdsk /f /r', 'disk errors'], ['sfc /scannow', 'system files'], ['DISM', 'repair image'], ['diskpart', 'partitions']]],
    ['Windows net', '', [['ipconfig /all /renew /flushdns', ''], ['ping, tracert, pathping', ''], ['nslookup', 'DNS'], ['netstat', 'connections'], ['net use', 'map drive']]],
    ['Policy', '', [['gpupdate /force', ''], ['gpresult /r', ''], ['whoami', '']]],
    ['Linux/mac', '', [['ls, cd, pwd, cp, mv, rm', ''], ['grep, find', ''], ['chmod, chown', '755'], ['sudo', ''], ['apt / dnf', 'packages'], ['ps, top, kill', ''], ['df, du', '']]]
  ]],
  cards: `ipconfig /all | Full IP config including MAC, DNS, DHCP server
ipconfig /release then /renew | Drop and request a new DHCP lease
ipconfig /flushdns | Clear the local DNS resolver cache
tracert | Lists every hop to a destination
pathping | ping + tracert with packet loss per hop
nslookup | Query DNS servers and records
netstat -an | Show all connections and listening ports numerically
net use | Map or disconnect network drives
chkdsk /r | Locate bad sectors and recover readable data
sfc /scannow | Scan and repair protected Windows system files
DISM /RestoreHealth | Repair the Windows component image
robocopy | Robust file copy, resumable, /MIR mirrors
diskpart | Command-line disk partitioning
gpupdate /force | Reapply Group Policy immediately
gpresult /r | Show applied Group Policy (RSoP)
chmod 755 | Owner rwx, group r-x, others r-x
grep | Search text for a pattern (Linux)
sudo | Run a command with root privileges
apt | Debian/Ubuntu package manager
dnf / yum | Red Hat/Fedora package manager
ps / top | List processes / live process monitor
df -h | Disk free space, human readable`,
  ex: [
    ['m', 'Users can reach sites by IP but not by name after a DNS change. Which command clears the cached entries on a PC?', ['ipconfig /flushdns', 'ipconfig /release', 'netstat -r', 'nslookup /clear'], '/flushdns empties the resolver cache.'],
    ['m', 'Which command shows the MAC address and DNS servers configured on a Windows PC?', ['ipconfig /all', 'ipconfig', 'ping -a', 'hostname'], '/all shows full details.'],
    ['m', 'Which command finds where along the path packets stop reaching a website?', ['tracert', 'ipconfig', 'netstat', 'net use'], 'tracert lists each hop.'],
    ['m', 'Windows reports corrupted system files after a crash. Which command repairs them?', ['sfc /scannow', 'chkdsk /f', 'format c:', 'gpupdate'], 'System File Checker.'],
    ['m', 'sfc /scannow reports it could not repair some files. What should be run next?', ['DISM /Online /Cleanup-Image /RestoreHealth', 'format', 'ipconfig /renew', 'diskpart clean'], 'DISM repairs the component store sfc relies on.'],
    ['m', 'Which command locates bad sectors on a drive and recovers readable information?', ['chkdsk /r', 'chkdsk /f only', 'sfc /scannow', 'defrag'], '/r implies /f and scans for bad sectors.'],
    ['m', 'A technician must copy a large folder tree to a server and resume if the network drops. BEST command?', ['robocopy', 'copy', 'move', 'xcopy without switches'], 'robocopy is robust and restartable.'],
    ['m', 'A new GPO was linked but a PC has not received it. Which command applies it now?', ['gpupdate /force', 'gpresult /r', 'net user', 'whoami'], 'gpupdate /force reapplies policy.'],
    ['m', 'Which command shows which Group Policies have been applied to the current user and computer?', ['gpresult /r', 'gpupdate', 'msinfo32', 'netsh'], 'Resultant Set of Policy.'],
    ['m', 'Which command maps drive letter S: to \\\\fs01\\sales?', ['net use S: \\\\fs01\\sales', 'map S: fs01\\sales', 'net share S:', 'mount S: fs01'], 'net use maps drives.'],
    ['m', 'On a Linux server, which command makes a script executable by its owner?', ['chmod +x script.sh', 'chown script.sh', 'sudo script.sh', 'grep +x script.sh'], 'chmod changes permissions.'],
    ['m', 'Which Linux command searches a log file for the word "error"?', ['grep error /var/log/syslog', 'find error', 'ls error', 'cat -s error'], 'grep searches text.'],
    ['m', 'Which command installs software on Ubuntu?', ['sudo apt install package', 'sudo dnf install package', 'brew install package', 'msiexec package'], 'Debian/Ubuntu use apt.'],
    ['m', 'Which command shows open network connections and listening ports on Windows?', ['netstat', 'nslookup', 'tracert', 'hostname'], 'netstat -an.'],
    ['mm', 'Which TWO Linux commands show running processes? (Choose two.)', ['ps', 'top', 'df', 'pwd', 'chmod'], 'ps lists, top monitors live.'],
    ['f', 'The Windows command that queries DNS directly is ___.', ['nslookup'], 'nslookup (dig on Linux/macOS).'],
    ['f', 'chmod 644 gives the owner read and write, and group/others ___ only.', ['read', 'r'], '6 = rw-, 4 = r--.'],
    ['f', 'The Linux command to print the current directory is ___.', ['pwd'], 'Print working directory.'],
    ['x', 'Match the task to the command.', [['Release and renew a DHCP lease', 'ipconfig'], ['Partition a disk from CLI', 'diskpart'], ['Show current user', 'whoami'], ['Check disk free space on Linux', 'df'], ['End a Linux process', 'kill'], ['Edit a file in Linux terminal', 'nano']], 'Command matching.'],
    ['t', 'sfc /scannow and chkdsk should be run from an elevated command prompt.', true, 'They need administrator rights.']
  ]
},
{
  day: 18, exam: 2, dom: '1.0', title: 'Windows networking, macOS, Linux and app installation', obj: '220-1202 · 1.0 Windows networking · macOS and Linux features · application installation · cloud productivity tools', deck: 'd18',
  goals: ['Configure workgroups vs domains, shares, mapped drives, proxy and firewall', 'Know macOS tools: Time Machine, FileVault, Keychain, Spotlight, Mission Control', 'Know Linux basics: distros, package managers, root, file systems', 'Check app requirements and installation methods'],
  concept: `
<h3>Windows networking</h3>
<tb>Item;Know this
Workgroup;Peer-to-peer, each PC has its own accounts. Small offices
Domain;Central Active Directory accounts and Group Policy. Pro/Enterprise
Shared folder;Right-click → Properties → Sharing. Admin shares end in $ (C$, ADMIN$) and are hidden
Mapped drive;Letter pointing to \\\\server\\share (net use, File Explorer → Map network drive)
Network profile;Public (discovery off, strict firewall) vs Private (discovery on)
Proxy settings;Settings → Network → Proxy, or Internet Options
Metered connection;Limits background data/updates
Firewall;Allow an app, ports, profiles (domain/private/public)
IP config;Static: IP, mask, gateway, DNS. Alternate configuration
VPN;Settings → Network → VPN
Printer sharing / file sharing;Network and Sharing Center → Advanced sharing</tb>
<h3>macOS</h3>
<tb>Feature;Use
Time Machine;Built-in backup to external drive/NAS, hourly snapshots
FileVault;Full-disk encryption
Keychain;Stores passwords, certificates, keys
Spotlight;Search (Cmd+Space)
Mission Control;View all windows and desktops (Spaces)
Finder;File manager
Dock;App launcher bar
iCloud;Sync files, photos, Keychain
Gestures;Trackpad multi-touch
Boot Camp;Run Windows on Intel Macs (not Apple silicon)
Terminal;Command line
Force Quit;Cmd+Option+Esc
Disk Utility;Repair (First Aid), erase, partition
Remote Disc / Screen Sharing;
System Settings (Preferences);Displays, network, printers, security & privacy, accessibility
App installation;.dmg (drag to Applications), .pkg installers, App Store. Uninstall: drag app to Trash
Updates;System Settings → General → Software Update</tb>
<h3>Linux</h3>
<ul>
<li>Distributions: Ubuntu/Debian (apt), Fedora/RHEL (dnf/yum), many more. Desktop or server.</li>
<li><b>root</b> = superuser. Use <f>sudo</f> rather than logging in as root.</li>
<li>File systems ext4, XFS. Files and folders are case-sensitive. Config in <f>/etc</f>, logs in <f>/var/log</f>, users' homes in <f>/home</f>.</li>
<li>Samba shares files with Windows. Updates via the package manager. Antivirus is less common but exists (ClamAV).</li>
</ul>
<h3>Installing applications</h3>
<tb>Consideration;Detail
System requirements;CPU (32 vs 64-bit), RAM, storage, GPU/VRAM, OS version
Distribution method;Physical media, download (ISO, .exe, .msi), app store, network deploy
Impact;Device (performance), network (bandwidth, ports), operation (training, support), business (licensing cost)
Permissions;Admin rights needed to install for all users
Compatibility;32-bit apps run on 64-bit Windows, not the reverse
Licensing;Per user, per device, subscription, open source</tb>
<h3>Cloud productivity tools</h3>
<p>Email (Microsoft 365 / Google Workspace), cloud storage and sync (OneDrive, Google Drive, iCloud), collaboration (Teams, Slack, Zoom), identity synchronization, licence assignment through an admin portal.</p>`,
  map: ['Networking & other OSs', '', [
    ['Windows net', '', [['workgroup vs domain', ''], ['shares, C$ admin share', ''], ['mapped drives', 'net use'], ['public vs private profile', ''], ['proxy, metered, firewall', '']]],
    ['macOS', '', [['Time Machine', 'backup'], ['FileVault', 'encryption'], ['Keychain', 'passwords'], ['Spotlight / Mission Control', ''], ['.dmg / .pkg', 'installs'], ['Force Quit', 'Cmd+Opt+Esc']]],
    ['Linux', '', [['apt / dnf', ''], ['root, sudo', ''], ['/etc, /var/log, /home', ''], ['Samba', 'Windows shares']]],
    ['Apps', '', [['requirements', '32/64-bit, RAM'], ['impact', 'device, network, business'], ['licensing', '']]]
  ]],
  cards: `Workgroup | Peer-to-peer network, local accounts on each PC
Domain | Centralized Active Directory accounts and policies
Admin share | Hidden share ending in $ (C$, ADMIN$)
Public network profile | Discovery off, stricter firewall
Metered connection | Restricts background data and updates
Time Machine | macOS built-in backup
FileVault | macOS full-disk encryption
Keychain | macOS password/certificate store
Spotlight | macOS search (Cmd+Space)
Mission Control | macOS view of all windows and desktops
Force Quit on macOS | Cmd+Option+Esc
.dmg | macOS disk image app installer
Disk Utility First Aid | Repairs macOS disks
Boot Camp | Run Windows on Intel-based Macs
root | Linux superuser account
/var/log | Linux log directory
/etc | Linux system configuration directory
Samba | Linux SMB file sharing with Windows`,
  ex: [
    ['m', 'A 6-person office wants simple file sharing with no server. Which Windows network model?', ['Workgroup', 'Domain', 'Hybrid Entra join', 'Forest trust'], 'Workgroup = peer-to-peer.'],
    ['m', 'A laptop on airport Wi-Fi should not be discoverable by other users. Which network profile?', ['Public', 'Private', 'Domain', 'Metered'], 'Public turns off discovery.'],
    ['m', 'A user on a limited cellular hotspot keeps hitting data caps from Windows updates. Set the connection as:', ['Metered', 'Private', 'Domain', 'Bridged'], 'Metered connections defer large downloads.'],
    ['m', 'Which macOS feature provides built-in backups to an external drive?', ['Time Machine', 'FileVault', 'Keychain', 'Spotlight'], 'Time Machine.'],
    ['m', 'Which macOS feature encrypts the entire startup disk?', ['FileVault', 'Keychain', 'Gatekeeper', 'Time Machine'], 'FileVault = full-disk encryption.'],
    ['m', 'A Mac user forgets stored website passwords. Where are they kept?', ['Keychain', 'Finder', 'Mission Control', 'Disk Utility'], 'Keychain stores credentials.'],
    ['m', 'An app is frozen on a Mac. Which shortcut opens Force Quit?', ['Cmd + Option + Esc', 'Ctrl + Alt + Del', 'Cmd + Space', 'Cmd + Tab'], 'Cmd+Option+Esc.'],
    ['m', 'How is a typical .dmg application installed on macOS?', ['Open it and drag the app to the Applications folder', 'Run msiexec', 'Use apt install', 'Copy it to System32'], 'Drag-to-Applications install.'],
    ['m', 'Which hidden share gives administrators access to the root of drive C:?', ['C$', 'ADMIN$', 'IPC$', 'PRINT$'], 'C$ is the default admin share.'],
    ['m', 'A 64-bit app will not install on a user\'s PC. MOST likely cause?', ['The OS is 32-bit', 'The PC has too much RAM', 'The user is on a domain', 'The app is unsigned'], '64-bit software needs a 64-bit OS.'],
    ['m', 'Where are most Linux system log files stored?', ['/var/log', '/etc', '/home', '/bin'], '/var/log.'],
    ['mm', 'Which TWO are business/operational impacts to consider before rolling out a new application? (Choose two.)', ['Licensing cost', 'User training and support', 'Monitor brightness', 'CMOS battery life', 'Keyboard layout'], 'Business and operational impact.'],
    ['f', 'The macOS search feature opened with Cmd+Space is ___.', ['Spotlight'], 'Spotlight.'],
    ['f', 'The Linux superuser account is called ___.', ['root'], 'root.'],
    ['x', 'Match the macOS feature to its purpose.', [['Time Machine', 'Backup'], ['FileVault', 'Disk encryption'], ['Keychain', 'Password storage'], ['Mission Control', 'View open windows and Spaces'], ['Disk Utility', 'Repair and erase disks']], 'macOS features.'],
    ['t', 'Linux file and folder names are case-sensitive.', true, 'Report.txt and report.txt are different files.'],
    ['m', 'A Windows user needs web traffic to go through the company proxy. Where is it configured?', ['Settings → Network & Internet → Proxy (or Internet Options)', 'Device Manager', 'Disk Management', 'Sound'], 'Proxy settings.']
  ]
},
{
  day: 19, exam: 2, dom: '2.0', title: 'Security concepts, Active Directory and authentication', obj: '220-1202 · 2.0 physical security · logical security · Active Directory · authentication', deck: 'd19',
  goals: ['Identify physical security controls', 'Apply least privilege, MFA, zero trust and access control models', 'Explain AD: domain, OU, GPO, login script, home folder, folder redirection', 'Compare RADIUS, TACACS+ and Kerberos'],
  concept: `
<h3>Physical security</h3>
<tb>Control;Purpose
Access control vestibule (mantrap);Two doors, one opens at a time. Stops tailgating
Badge reader / key fob / smart card;Electronic entry
Biometrics;Fingerprint, retina, palm, facial recognition
Video surveillance;Deterrent and evidence
Alarm systems / motion sensors;Detection
Door locks, equipment locks (cable locks), locking racks;
Security guards;Verify identity, stop tailgating
Bollards;Stop vehicles
Fences, lighting;Perimeter
Magnetometers;Metal detection
Privacy screen filter;Stops shoulder surfing</tb>
<h3>Logical security</h3>
<ul>
<li><b>Principle of least privilege</b>: only the access needed to do the job.</li>
<li><b>Zero trust</b>: never trust, always verify, every request, from anywhere.</li>
<li><b>MFA</b>: two or more factor types: something you know (password, PIN), have (phone, token, smart card), are (biometric), plus somewhere you are / something you do. Two passwords = still one factor.</li>
<li>MFA methods: authenticator app (TOTP), hardware token, SMS/voice (weakest), push notification, email code.</li>
<li><b>ACLs</b>: rules that permit/deny (on files, routers, firewalls).</li>
<li><b>SSO</b>: one login for many apps (SAML, OAuth/OIDC).</li>
<li><b>Just-in-time access</b> and <b>PAM</b> (privileged access management): temporary admin rights.</li>
<li><b>IAM</b>: identity and access management (accounts lifecycle). <b>DLP</b>: data loss prevention stops sensitive data leaving.</li>
<li>Access control models: discretionary, mandatory, role-based (RBAC), rule-based.</li>
</ul>
<h3>Active Directory</h3>
<tb>Item;Meaning
Domain;Security boundary with central accounts, managed by domain controllers
Organizational Unit (OU);Container for users/computers to apply policies and delegate admin
Group Policy (GPO);Settings pushed to users/computers (password rules, drive maps, software)
Security groups;Assign permissions to groups, not individuals
Login script;Runs at sign-in (map drives, printers)
Home folder;Personal network folder for each user
Folder redirection;Moves Documents/Desktop to the network
Roaming profile;User profile follows them to any PC</tb>
<h3>Authentication protocols</h3>
<tb>Protocol;Notes
RADIUS;AAA for network access (Wi-Fi 802.1X, VPN). UDP 1812/1813. Encrypts only the password
TACACS+;Cisco AAA for device admin. TCP 49. Encrypts the whole payload, separates AAA
Kerberos;Windows domain authentication using tickets. Port 88. Needs time sync
LDAP;Directory queries (389, LDAPS 636)</tb>
<n>WPA2/WPA3-<b>Enterprise</b> uses 802.1X with a RADIUS server. WPA-<b>Personal</b> uses a pre-shared key.</n>`,
  map: ['Security concepts', '', [
    ['Physical', '', [['vestibule', 'anti-tailgating'], ['badges, biometrics', ''], ['cameras, alarms', ''], ['bollards, fences', ''], ['privacy filter', '']]],
    ['Logical', '', [['least privilege', ''], ['zero trust', ''], ['MFA', 'know / have / are'], ['SSO', ''], ['ACL', ''], ['PAM, JIT', '']]],
    ['Active Directory', '', [['domain', ''], ['OU', 'apply GPO'], ['GPO', 'settings'], ['login script', ''], ['home folder / redirection', '']]],
    ['AAA', '', [['RADIUS', 'UDP 1812, Wi-Fi/VPN'], ['TACACS+', 'TCP 49, devices'], ['Kerberos', 'tickets, 88']]]
  ]],
  cards: `Access control vestibule | Two-door entry that stops tailgating (mantrap)
Bollards | Posts that block vehicles
Principle of least privilege | Give only the minimum access needed
Zero trust | Never trust, always verify every request
MFA | Two or more different factor types
Something you have | Phone, token, smart card
Something you are | Biometric
SSO | One sign-in grants access to many applications
OU | Organizational Unit: AD container for applying GPOs and delegation
GPO | Group Policy Object: pushes settings to users/computers
Folder redirection | Moves user folders (Documents) to a network location
Home folder | Per-user network storage location
Login script | Script that runs at sign-in (map drives/printers)
RADIUS | AAA for network access, UDP 1812/1813, used by 802.1X
TACACS+ | Cisco AAA for device admin, TCP 49, encrypts whole payload
Kerberos | Ticket-based domain authentication, port 88, needs time sync
DLP | Data loss prevention, blocks sensitive data leaving
PAM | Privileged access management`,
  ex: [
    ['m', 'An employee follows a coworker through a badge door without swiping. Which control BEST prevents this?', ['Access control vestibule', 'Privacy screen', 'Bollards', 'Cable lock'], 'Vestibules allow one person at a time.'],
    ['m', 'Which is an example of multifactor authentication?', ['Password plus a code from an authenticator app', 'Password plus a PIN', 'Two different passwords', 'Username plus password'], 'Different factor types: know + have.'],
    ['m', 'A new accounts clerk is given access only to the accounting share and no admin rights. This is:', ['Principle of least privilege', 'Zero trust', 'SSO', 'Mandatory access control'], 'Minimum access for the role.'],
    ['m', 'An admin wants all sales PCs to receive a desktop wallpaper policy. Where should the computer objects be placed?', ['In a Sales OU with a linked GPO', 'In the Users container only', 'In a local group on each PC', 'In DNS'], 'GPOs link to OUs.'],
    ['m', 'Users want their Documents folder available on any PC they sign into and backed up on the server. Configure:', ['Folder redirection', 'A login script that copies files', 'Hibernate', 'Fast startup'], 'Folder redirection stores Documents on the network.'],
    ['m', 'Which protocol authenticates Wi-Fi users in WPA3-Enterprise?', ['RADIUS (802.1X)', 'TACACS+', 'SNMP', 'TFTP'], 'Enterprise Wi-Fi uses 802.1X with RADIUS.'],
    ['m', 'Which AAA protocol encrypts the entire payload and is used for network device administration?', ['TACACS+', 'RADIUS', 'Kerberos', 'LDAP'], 'TACACS+ over TCP 49.'],
    ['m', 'Domain logins fail because a PC clock is 10 minutes off. Which protocol is sensitive to this?', ['Kerberos', 'RADIUS', 'SMTP', 'DHCP'], 'Kerberos tickets require time sync (default 5 min skew).'],
    ['m', 'A security model where every access request is verified regardless of network location is:', ['Zero trust', 'Least privilege', 'Defence in depth', 'Discretionary access'], 'Zero trust.'],
    ['m', 'Which control stops a vehicle from being driven into a building entrance?', ['Bollards', 'Badge reader', 'Motion sensor', 'Mantrap'], 'Bollards.'],
    ['mm', 'Which TWO are "something you have" factors? (Choose two.)', ['Hardware token', 'Smart card', 'Fingerprint', 'PIN', 'Password'], 'Possession factors.'],
    ['m', 'Which tool stops employees emailing files containing credit card numbers outside the company?', ['DLP', 'SSO', 'Kerberos', 'Bollards'], 'Data loss prevention.'],
    ['f', 'An AD container used to group objects and apply Group Policy is an ___.', ['OU', 'organizational unit'], 'Organizational Unit.'],
    ['f', 'TACACS+ uses TCP port ___.', ['49'], '49.'],
    ['x', 'Match the factor to its type.', [['Password', 'Something you know'], ['Authenticator app on phone', 'Something you have'], ['Retina scan', 'Something you are'], ['GPS location check', 'Somewhere you are']], 'Authentication factors.'],
    ['t', 'Two passwords together count as multifactor authentication.', false, 'Both are "something you know". MFA needs different factor types.'],
    ['m', 'A user signs in once and gets access to email, CRM and the HR portal. This is:', ['Single sign-on', 'MFA', 'Least privilege', 'Folder redirection'], 'SSO.']
  ]
},
{
  day: 20, exam: 2, dom: '2.0', title: 'Wireless security and malware', obj: '220-1202 · 2.0 wireless security protocols · malware types · detection, removal and prevention tools', deck: 'd20',
  goals: ['Compare WEP, WPA, WPA2, WPA3, TKIP and AES', 'Identify malware by behaviour', 'Pick tools for detection, removal and prevention (AV, EDR, MDR, XDR, recovery console)', 'Know the CompTIA malware removal steps'],
  concept: `
<h3>Wireless security protocols</h3>
<tb>Protocol;Encryption;Status
WEP;RC4;Broken. Never use
WPA;TKIP (RC4);Deprecated
WPA2;AES-CCMP;Still common. Personal (PSK) or Enterprise (802.1X/RADIUS)
WPA3;AES with SAE (Simultaneous Authentication of Equals);Current best. Protects weak passwords against offline cracking, forward secrecy. 192-bit Enterprise mode</tb>
<t>TKIP = old and weak. AES = strong. If a question offers "WPA2 with TKIP" vs "WPA2 with AES", choose AES. Best overall = WPA3.</t>
<p>Authentication: Personal = pre-shared key (passphrase). Enterprise = 802.1X with RADIUS/TACACS+ and per-user credentials. Kerberos for domain. MFA where possible.</p>
<h3>Malware types</h3>
<tb>Type;Behaviour
Virus;Attaches to files, spreads when the file runs
Worm;Self-replicates across networks without user action
Trojan;Disguised as legitimate software
Ransomware;Encrypts files and demands payment
Spyware;Secretly collects user activity/data
Keylogger;Records keystrokes (passwords)
Rootkit;Hides deep in the OS/kernel/boot, conceals other malware, hard to remove
Boot sector virus;Infects the MBR/boot sector, loads before the OS
Botnet;Infected machines controlled remotely (DDoS, spam)
Cryptominer;Uses CPU/GPU to mine cryptocurrency (slow, hot PC)
Stalkerware;Spyware used to monitor a specific person
Fileless malware;Runs in memory/legit tools (PowerShell), leaves few files
Adware;Unwanted ads, pop-ups, browser changes
PUP;Potentially unwanted program bundled with installs</tb>
<h3>Detection, removal and prevention tools</h3>
<tb>Tool;Use
Antivirus / anti-malware;Signature and heuristic scanning. Keep definitions updated
EDR;Endpoint detection and response: monitors behaviour, isolates hosts
MDR;Managed detection and response: outsourced EDR monitoring
XDR;Extended detection and response: correlates endpoint, network, email, cloud
Software firewall;Blocks unwanted connections
Email security gateway;Filters spam/phishing/attachments
Anti-phishing training;Users are the last line of defence
Recovery console / Windows RE;Repair startup, restore, command prompt
Safe mode;Boot with minimal drivers to remove malware
Reinstall / reimage;When malware cannot be trusted removed (rootkits)
OS reinstallation from known-good image;</tb>
<h3>CompTIA malware removal process (memorise)</h3>
<tb>#;Step
1;Investigate and verify malware symptoms
2;Quarantine the infected system (disconnect from network)
3;Disable System Restore (in Windows Home)
4;Remediate the infected system: update anti-malware software, then scan and remove (Safe Mode, WinRE, pre-installation environment)
5;Schedule scans and run updates
6;Enable System Restore and create a restore point (in Windows Home)
7;Educate the end user</tb>
<n>Why disable System Restore? Restore points can contain the malware and reinfect the PC. Turn it back on (and make a clean point) after cleaning.</n>`,
  map: ['Wireless & malware', '', [
    ['Wi-Fi security', '', [['WEP', 'broken'], ['WPA/TKIP', 'deprecated'], ['WPA2 AES', 'ok'], ['WPA3 SAE', 'best'], ['Personal = PSK', ''], ['Enterprise = 802.1X', 'RADIUS']]],
    ['Malware', '', [['virus / worm / trojan', ''], ['ransomware', 'encrypts'], ['spyware, keylogger', ''], ['rootkit, boot sector', 'hard to remove'], ['cryptominer', 'slow, hot'], ['fileless', 'memory']]],
    ['Tools', '', [['AV', ''], ['EDR / MDR / XDR', ''], ['Safe Mode, WinRE', ''], ['reimage', 'last resort']]],
    ['Removal 7 steps', '', [['investigate', ''], ['quarantine', ''], ['disable System Restore', ''], ['remediate', 'update then scan'], ['schedule scans', ''], ['enable SR + point', ''], ['educate', '']]]
  ]],
  cards: `WEP | Broken RC4 Wi-Fi encryption, never use
TKIP | Old WPA encryption, weak
AES-CCMP | WPA2 encryption, strong
WPA3 SAE | Simultaneous Authentication of Equals, resists offline password cracking
WPA2/3 Personal | Pre-shared key (passphrase)
WPA2/3 Enterprise | 802.1X with RADIUS, per-user credentials
Worm | Self-replicating malware that spreads without user action
Trojan | Malware disguised as legitimate software
Ransomware | Encrypts data and demands payment
Rootkit | Hides in kernel/boot, conceals itself, often needs reimage
Keylogger | Records keystrokes
Cryptominer | Uses system resources to mine crypto
Fileless malware | Lives in memory and abuses legit tools
EDR | Endpoint detection and response
MDR | Managed (outsourced) detection and response
XDR | Extended detection across endpoint, network, email, cloud
Malware removal step 2 | Quarantine the infected system
Malware removal step 3 | Disable System Restore (Windows Home)
Malware removal step 7 | Educate the end user`,
  ex: [
    ['s', 'Order the CompTIA malware removal process.', ['Investigate and verify malware symptoms', 'Quarantine the infected system', 'Disable System Restore', 'Remediate: update anti-malware, then scan and remove', 'Schedule scans and run updates', 'Enable System Restore and create a restore point', 'Educate the end user'], 'Investigate, quarantine, disable SR, remediate, schedule, enable SR, educate.'],
    ['m', 'A technician confirms a PC has malware. What is the NEXT step?', ['Quarantine the system from the network', 'Educate the user', 'Enable System Restore', 'Reinstall Windows'], 'Step 2: quarantine.'],
    ['m', 'Before scanning an infected PC, the technician should update the anti-malware definitions. This is part of which step?', ['Remediate the infected system', 'Investigate symptoms', 'Schedule scans', 'Educate the end user'], 'Update, then scan and remove.'],
    ['m', 'Why disable System Restore during malware removal?', ['Restore points may contain malware that can reinfect the system', 'It speeds up scanning', 'It is required for Safe Mode', 'It frees RAM'], 'Infected restore points.'],
    ['m', 'Which Wi-Fi security is the MOST secure for a home router?', ['WPA3-Personal (SAE)', 'WPA2 with TKIP', 'WEP 128-bit', 'Open with MAC filtering'], 'WPA3 is current best.'],
    ['m', 'A company wants each employee to log in to Wi-Fi with their own domain credentials. Configure:', ['WPA2/WPA3-Enterprise with a RADIUS server', 'WPA2-Personal', 'WEP', 'An open SSID with a captive portal'], 'Enterprise = 802.1X per-user auth.'],
    ['m', 'Files on a file server suddenly have a new extension and a note demands Bitcoin. Which malware?', ['Ransomware', 'Adware', 'Keylogger', 'Worm'], 'Encrypts and extorts.'],
    ['m', 'Malware spread to every unpatched PC on the network overnight with no one opening anything. Which type?', ['Worm', 'Trojan', 'Virus', 'Spyware'], 'Worms self-replicate.'],
    ['m', 'A free "PDF converter" a user installed is secretly sending data to an attacker. This is a:', ['Trojan', 'Worm', 'Boot sector virus', 'Botnet C2 server'], 'Disguised as useful software.'],
    ['m', 'A PC runs hot and slow; the GPU is at 100% even when idle. MOST likely:', ['Cryptominer', 'Ransomware', 'Keylogger', 'Adware'], 'Mining uses CPU/GPU heavily.'],
    ['m', 'AV keeps detecting malware that returns after every reboot and hides from the OS. BEST fix?', ['Reimage from a known-good image', 'Run the same scan again', 'Disable the firewall', 'Clear the browser cache'], 'Rootkits often require wiping.'],
    ['m', 'Which solution correlates threats across endpoints, email, network and cloud?', ['XDR', 'Antivirus', 'Software firewall', 'Keychain'], 'Extended detection and response.'],
    ['mm', 'Which TWO are signs a rootkit or boot-level malware may be present? (Choose two.)', ['Malware returns after removal and hides from normal tools', 'Antivirus is disabled and cannot be re-enabled', 'Printer prints blank pages', 'Monitor flickers on VGA', 'Wi-Fi uses channel 6'], 'Persistence and security tools being disabled.'],
    ['f', 'WPA3 replaces the pre-shared key handshake with ___.', ['SAE', 'simultaneous authentication of equals'], 'SAE resists offline dictionary attacks.'],
    ['f', 'The final step of malware removal is to ___ the end user.', ['educate', 'train'], 'Educate the end user.'],
    ['x', 'Match the malware to its behaviour.', [['Keylogger', 'Records keystrokes'], ['Ransomware', 'Encrypts files for payment'], ['Rootkit', 'Hides deep in the OS'], ['Worm', 'Spreads on its own'], ['Spyware', 'Collects user activity'], ['Botnet', 'Remote-controlled infected hosts']], 'Malware behaviour matching.'],
    ['t', 'WPA2 with AES is more secure than WPA2 with TKIP.', true, 'AES-CCMP is strong. TKIP is deprecated.']
  ]
},
{
  day: 21, exam: 2, dom: '2.0', title: 'Social engineering, attacks and vulnerabilities', obj: '220-1202 · 2.0 social engineering · threats · vulnerabilities', deck: 'd21', mock: 'c2check',
  goals: ['Identify phishing variants and other social engineering', 'Recognise network and application attacks', 'Know common vulnerabilities and how to reduce them', 'Choose the right response to a social engineering attempt'],
  concept: `
<h3>Social engineering</h3>
<tb>Attack;What it looks like
Phishing;Mass fake emails to steal credentials or deliver malware
Spear phishing;Targeted at a specific person/org with personal details
Whaling;Spear phishing aimed at executives
Vishing;Voice phishing by phone ("This is IT, I need your password")
Smishing;SMS phishing
QR code phishing (quishing);Malicious QR code
Shoulder surfing;Watching someone type or read screens
Tailgating;Following someone through a secure door without their knowledge
Piggybacking;Same, but with the person's consent
Impersonation;Pretending to be IT, a vendor, a delivery person
Dumpster diving;Searching trash for documents
Evil twin;Rogue AP with a legitimate-looking SSID
Business email compromise (BEC);Compromised/spoofed exec or vendor email asks for payments or gift cards
Pretexting;Invented scenario to gain trust</tb>
<h3>Threats and attacks</h3>
<tb>Attack;Description
DoS / DDoS;Overwhelm a service (DDoS = many sources, often a botnet)
Zero-day;Exploit for an unpatched, unknown vulnerability
Spoofing;Faking an identity (IP, MAC, email sender)
On-path (man-in-the-middle);Attacker intercepts/alters traffic between two parties
Brute force;Trying every combination
Dictionary attack;Trying common words/leaked passwords
Insider threat;Malicious or careless employee
SQL injection;Malicious SQL entered in input fields to read/alter a database
Cross-site scripting (XSS);Malicious script injected into a web page runs in victims' browsers
Supply chain attack;Compromise via a trusted vendor/software update
Cloud-based / misconfiguration;Open storage buckets, weak IAM</tb>
<h3>Vulnerabilities</h3>
<ul>
<li><b>Unpatched systems</b> and <b>EOL OS</b> (no more updates): biggest real-world risk.</li>
<li><b>Non-compliant systems</b> (missing encryption/AV per policy).</li>
<li><b>Unprotected systems</b> (no AV or firewall).</li>
<li><b>BYOD</b> without MDM.</li>
<li>Default credentials, weak passwords, open ports, legacy protocols.</li>
</ul>
<h3>How to respond</h3>
<ul>
<li>Never give passwords over the phone/email. IT will never ask for it.</li>
<li>Verify requests through a known channel (call back on the official number).</li>
<li>Report phishing to security. Don't click links or open attachments.</li>
<li>Challenge unknown people in secure areas or report them. Don't hold doors.</li>
<li>Shred sensitive documents. Use privacy screens. Lock your screen (Win+L).</li>
</ul>`,
  map: ['Social engineering & attacks', '', [
    ['Phishing family', '', [['phishing', 'mass'], ['spear', 'targeted'], ['whaling', 'execs'], ['vishing', 'voice'], ['smishing', 'SMS'], ['BEC', 'payment fraud']]],
    ['Physical SE', '', [['tailgating', ''], ['shoulder surfing', ''], ['dumpster diving', ''], ['impersonation', '']]],
    ['Attacks', '', [['DoS/DDoS', ''], ['on-path', ''], ['zero-day', ''], ['brute force / dictionary', ''], ['SQLi, XSS', 'web'], ['evil twin', 'rogue AP']]],
    ['Vulnerabilities', '', [['unpatched / EOL', ''], ['non-compliant', ''], ['BYOD', ''], ['defaults', '']]]
  ]],
  cards: `Spear phishing | Phishing targeted at a specific person or organization
Whaling | Phishing aimed at executives
Vishing | Voice (phone) phishing
Smishing | SMS text phishing
Tailgating | Following someone through a secure door unnoticed
Piggybacking | Entering a secure area with the authorized person's consent
Shoulder surfing | Watching someone's screen or keyboard
Dumpster diving | Searching trash for sensitive information
Evil twin | Rogue access point impersonating a legitimate SSID
BEC | Business email compromise: fake exec/vendor payment requests
Zero-day | Exploit of an unknown/unpatched vulnerability
On-path attack | Intercepting traffic between two parties (MITM)
DDoS | Denial of service from many sources (botnet)
SQL injection | Malicious SQL in input fields to access a database
XSS | Cross-site scripting: injected script runs in users' browsers
Dictionary attack | Guessing passwords from a word list
EOL OS | No longer receives security updates`,
  ex: [
    ['m', 'The CFO receives an email that appears to come from the CEO asking for an urgent wire transfer to a new account. This is:', ['Business email compromise / whaling', 'Smishing', 'Dumpster diving', 'Evil twin'], 'Exec-targeted payment fraud.'],
    ['m', 'A caller claiming to be from IT asks a user for their password to "fix a mailbox issue". This is:', ['Vishing', 'Smishing', 'Tailgating', 'Spear phishing by email'], 'Voice phishing.'],
    ['m', 'A user receives a text saying their parcel is held and to click a link to pay a fee. This is:', ['Smishing', 'Vishing', 'Whaling', 'Shoulder surfing'], 'SMS phishing.'],
    ['m', 'At a coffee shop, users connect to "CoffeeShop_Free" which is actually run by an attacker. This is a(n):', ['Evil twin', 'DDoS', 'Zero-day', 'SQL injection'], 'Rogue AP mimicking a real SSID.'],
    ['m', 'An attacker enters "\' OR 1=1 --" into a login form to bypass authentication. This is:', ['SQL injection', 'Cross-site scripting', 'Brute force', 'Spoofing'], 'Injected SQL.'],
    ['m', 'A website is knocked offline by traffic from thousands of compromised IoT devices. This is:', ['DDoS', 'On-path', 'Phishing', 'Insider threat'], 'Distributed denial of service via botnet.'],
    ['m', 'Attackers exploit a flaw the vendor did not know about and has not patched. This is a:', ['Zero-day', 'Dictionary attack', 'Tailgating', 'Brute force'], 'Zero-day.'],
    ['m', 'A visitor waits by a badge door and walks in right behind an employee without being noticed. This is:', ['Tailgating', 'Piggybacking', 'Impersonation', 'Shoulder surfing'], 'Unnoticed = tailgating. With consent = piggybacking.'],
    ['m', 'Which control MOST directly reduces shoulder surfing?', ['Privacy screen filter', 'Bollards', 'Firewall', 'Shredder'], 'Privacy filters narrow the viewing angle.'],
    ['m', 'Which is the BEST response when an employee gets a suspicious email with an attachment?', ['Do not open it and report it to the security team', 'Open it to check if it\'s real', 'Forward it to coworkers to warn them', 'Reply asking if it\'s legitimate'], 'Report through the proper channel.'],
    ['m', 'A shredding policy for printed documents mainly defends against:', ['Dumpster diving', 'DDoS', 'Zero-day', 'Evil twin'], 'Shred before discarding.'],
    ['mm', 'Which TWO are vulnerabilities rather than attacks? (Choose two.)', ['An unpatched end-of-life operating system', 'A BYOD phone with no MDM', 'A DDoS attack', 'A phishing email', 'SQL injection'], 'Vulnerabilities are weaknesses. Attacks exploit them.'],
    ['m', 'An attacker on the same Wi-Fi intercepts and modifies traffic between a user and a website. This is:', ['On-path attack', 'Whaling', 'Dumpster diving', 'Brute force'], 'Man-in-the-middle / on-path.'],
    ['f', 'Phishing targeted at senior executives is called ___.', ['whaling'], 'Whaling.'],
    ['f', 'Malicious script injected into a trusted website that runs in visitors\' browsers is cross-site ___.', ['scripting', 'scripting (xss)'], 'XSS.'],
    ['x', 'Match the attack to its description.', [['Spear phishing', 'Targeted email using personal details'], ['Dumpster diving', 'Searching trash'], ['Brute force', 'Trying every combination'], ['Impersonation', 'Pretending to be a technician'], ['Evil twin', 'Fake Wi-Fi access point']], 'Attack identification.'],
    ['t', 'Piggybacking differs from tailgating because the authorized person knowingly lets the intruder in.', true, 'Consent is the difference.']
  ]
}
);
