/* Flashcard decks: one per lesson (from lesson.cards) plus high-yield decks. */
(function () {
  const D = (window.DECKS = {});
  const parse = (id, txt) => txt.trim().split('\n').map((l, i) => { const k = l.indexOf(' | '); return { id: id + '-' + i, f: l.slice(0, k).trim(), b: l.slice(k + 3).trim() }; });
  window.LESSONS.forEach((L) => { D[L.deck] = { id: L.deck, name: 'Day ' + L.day + ' · ' + L.title, day: L.day, cards: parse(L.deck, L.cards) }; });
  D.ports = { id: 'ports', name: 'Ports & protocols (all of them)', cards: parse('ports', `
20/21 | FTP (TCP) file transfer, cleartext
22 | SSH / SFTP / SCP (TCP)
23 | Telnet (TCP), insecure remote terminal
25 | SMTP (TCP) mail relay between servers
53 | DNS (UDP queries, TCP zone transfers)
67/68 | DHCP (UDP) server/client
69 | TFTP (UDP)
80 | HTTP (TCP)
88 | Kerberos
110 | POP3 (TCP)
137-139 | NetBIOS over TCP/IP
143 | IMAP (TCP)
161/162 | SNMP / SNMP traps (UDP)
389 | LDAP
443 | HTTPS (TCP)
445 | SMB / CIFS (TCP)
514 | Syslog (UDP)
587 | SMTP submission (client to server)
636 | LDAPS
993 | IMAPS (IMAP over TLS)
995 | POP3S (POP3 over TLS)
1812/1813 | RADIUS authentication/accounting
49 | TACACS+ (TCP)
3389 | RDP (Remote Desktop)
5900 | VNC
9100 | Raw TCP printing (JetDirect)
SSH | Port 22
RDP | Port 3389
DNS | Port 53
SMB | Port 445
LDAP | Port 389
SNMP | Port 161 (traps 162)
DHCP | Ports 67/68 UDP
HTTPS | Port 443`) };
  D.acronyms = { id: 'acronyms', name: 'Acronyms that show up in questions', cards: parse('acr', `
AAA | Authentication, Authorization, Accounting
ACL | Access Control List
AES | Advanced Encryption Standard
APIPA | Automatic Private IP Addressing (169.254.x.x)
BEC | Business Email Compromise
BSOD | Blue Screen of Death
BYOD | Bring Your Own Device
CAB | Change Advisory Board
CMDB | Configuration Management Database
DDoS | Distributed Denial of Service
DHCP | Dynamic Host Configuration Protocol
DKIM | DomainKeys Identified Mail
DLP | Data Loss Prevention
DMARC | Domain-based Message Authentication, Reporting and Conformance
DNS | Domain Name System
DRM | Digital Rights Management
ECC | Error-Correcting Code (memory)
EDR | Endpoint Detection and Response
EFS | Encrypting File System
EOL | End of Life
ESD | Electrostatic Discharge
EULA | End-User License Agreement
GPO | Group Policy Object
GPT | GUID Partition Table
HSM | Hardware Security Module
IaaS | Infrastructure as a Service
IMAP | Internet Message Access Protocol
KVM | Keyboard, Video, Mouse (switch) / Kernel-based Virtual Machine
LDAP | Lightweight Directory Access Protocol
MAM | Mobile Application Management
MBR | Master Boot Record
MDM | Mobile Device Management
MDR | Managed Detection and Response
MFA | Multifactor Authentication
NAS | Network-Attached Storage
NAT | Network Address Translation
NFC | Near Field Communication
NTFS | New Technology File System
NVMe | Non-Volatile Memory Express
OU | Organizational Unit
PaaS | Platform as a Service
PCI DSS | Payment Card Industry Data Security Standard
PHI | Protected Health Information
PII | Personally Identifiable Information
PoE | Power over Ethernet
POST | Power-On Self-Test
PXE | Preboot Execution Environment
RADIUS | Remote Authentication Dial-In User Service
RAID | Redundant Array of Independent Disks
RDP | Remote Desktop Protocol
RMM | Remote Monitoring and Management
SaaS | Software as a Service
SAE | Simultaneous Authentication of Equals (WPA3)
SAN | Storage Area Network
SDS | Safety Data Sheet
SLA | Service Level Agreement
SMB | Server Message Block
SNMP | Simple Network Management Protocol
SOHO | Small Office / Home Office
SOP | Standard Operating Procedure
SPF | Sender Policy Framework
SSO | Single Sign-On
TACACS+ | Terminal Access Controller Access-Control System Plus
TKIP | Temporal Key Integrity Protocol
TPM | Trusted Platform Module
UAC | User Account Control
UEFI | Unified Extensible Firmware Interface
UPS | Uninterruptible Power Supply
UTM | Unified Threat Management
VDI | Virtual Desktop Infrastructure
VLAN | Virtual LAN
VPN | Virtual Private Network
WISP | Wireless Internet Service Provider
WPA | Wi-Fi Protected Access
WPS | Wi-Fi Protected Setup
XDR | Extended Detection and Response
XSS | Cross-Site Scripting`) };
  D.wincmd = { id: 'wincmd', name: 'Windows commands and tools', cards: parse('win', `
Show full IP config with MAC and DNS | ipconfig /all
Get a new DHCP lease | ipconfig /release then ipconfig /renew
Clear DNS cache | ipconfig /flushdns
Trace the route to a host | tracert
Ping + trace with loss per hop | pathping
Query DNS | nslookup
Show connections and listening ports | netstat -an (-b for program)
Map a network drive | net use Z: \\\\server\\share
Manage local users from CLI | net user
Repair system files | sfc /scannow
Repair the Windows image | DISM /Online /Cleanup-Image /RestoreHealth
Fix disk errors and bad sectors | chkdsk /f /r
Robust copy / mirror a folder | robocopy (/MIR)
Partition disks from CLI | diskpart
Reapply Group Policy | gpupdate /force
Show applied policies | gpresult /r
Show current user | whoami
Show Windows version | winver
Shut down / restart | shutdown /s /t 0  ·  shutdown /r
Event logs | eventvwr.msc
Drivers | devmgmt.msc
Partitions and drive letters | diskmgmt.msc
Scheduled jobs | taskschd.msc
Local users and groups | lusrmgr.msc
Performance counters / baselines | perfmon.msc
Services | services.msc
Local Group Policy | gpedit.msc
Certificates | certmgr.msc
System inventory | msinfo32
Live per-process resources | resmon
Safe boot / boot options | msconfig
Registry | regedit
Disk cleanup | cleanmgr
Optimize / defrag | dfrgui
DirectX diagnostics | dxdiag
Remote Desktop client | mstsc
Advanced firewall | wf.msc
System properties | sysdm.cpl`) };
  D.nixcmd = { id: 'nixcmd', name: 'Linux and macOS commands', cards: parse('nix', `
List files including hidden, long format | ls -la
Print working directory | pwd
Change directory | cd
Copy / move / remove | cp / mv / rm (rm -r for folders)
Make a directory | mkdir
Show file contents | cat
Search text for a pattern | grep
Find files | find
Change permissions | chmod (e.g. chmod 755 file)
Change owner | chown
Run as superuser | sudo
Switch user | su
Debian/Ubuntu packages | apt
Red Hat/Fedora packages | dnf (yum)
macOS package manager | brew (Homebrew)
Network interfaces | ip addr (ifconfig)
DNS lookup | dig (or nslookup)
List processes | ps
Live process monitor | top
End a process | kill PID
Disk free | df -h
Disk usage of a folder | du -sh
Manual page | man
Text editors | nano, vi
Download from a URL | curl
Log location | /var/log
Config location | /etc
chmod 755 | rwx r-x r-x
chmod 644 | rw- r-- r--`) };
})();
