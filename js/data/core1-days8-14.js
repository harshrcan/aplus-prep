/* Core 1 lessons, days 8 to 14 */
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(
{
  day: 8, exam: 1, dom: '2.0', title: 'TCP, UDP, ports and protocols', obj: '220-1201 · 2.1 TCP/UDP ports, protocols and purposes', deck: 'd8',
  goals: ['State the port number and purpose of every protocol on the objectives', 'Say whether each runs over TCP or UDP', 'Pick the secure replacement for each insecure protocol', 'Solve "which port must be opened" questions'],
  concept: `
<h3>TCP vs UDP</h3>
<tb>;TCP;UDP
Connection;Connection-oriented (3-way handshake SYN, SYN-ACK, ACK);Connectionless
Reliability;Guaranteed delivery, ordering, retransmits;Best effort, no retransmit
Speed;Slower, more overhead;Faster, low overhead
Used for;Web, email, file transfer, remote access;DNS queries, DHCP, TFTP, SNMP, streaming, VoIP</tb>
<h3>The port table (memorise this)</h3>
<tb>Port;Protocol;Transport;Purpose
20 / 21;FTP;TCP;File transfer (20 data, 21 control). Cleartext
22;SSH (also SFTP, SCP);TCP;Secure remote shell, secure file transfer
23;Telnet;TCP;Cleartext remote terminal. Replace with SSH
25;SMTP;TCP;Sending email between servers (587 for client submission)
53;DNS;TCP/UDP;Name resolution (UDP queries, TCP zone transfers)
67 / 68;DHCP;UDP;Automatic IP addressing (67 server, 68 client)
69;TFTP;UDP;Trivial file transfer, no auth (network device configs, PXE)
80;HTTP;TCP;Web, cleartext
110;POP3;TCP;Retrieve email (downloads, usually deletes from server)
137–139;NetBIOS / NetBT;UDP/TCP;Legacy Windows name and session services
143;IMAP;TCP;Retrieve email, keeps it synced on server
161 / 162;SNMP;UDP;Network monitoring (162 = traps)
389;LDAP;TCP/UDP;Directory queries (Active Directory). 636 = LDAPS
443;HTTPS;TCP;Web over TLS
445;SMB / CIFS;TCP;Windows file and printer sharing
3389;RDP;TCP/UDP;Remote Desktop Protocol</tb>
<n>Extra ports worth knowing: 587 SMTP submission, 993 IMAPS, 995 POP3S, 636 LDAPS, 514 syslog, 1812/1813 RADIUS, 49 TACACS+, 88 Kerberos, 5900 VNC, 9100 raw printing.</n>
<h3>Insecure → secure</h3>
<tb>Insecure;Secure replacement
Telnet 23;SSH 22
FTP 20/21;SFTP 22 (over SSH) or FTPS 989/990
HTTP 80;HTTPS 443
POP3 110 / IMAP 143;POP3S 995 / IMAPS 993
LDAP 389;LDAPS 636
SNMP v1/v2c;SNMPv3 (encryption, auth)</tb>
<t>SFTP runs on SSH port <b>22</b>, not 21. FTPS is FTP + TLS. RDP is 3389, VNC is 5900. SMB is 445, NetBIOS is 137–139. DHCP and TFTP are UDP. DNS uses both.</t>
<h3>How to remember</h3>
<ul>
<li>20-21-22-23-25: FTP, FTP, SSH, Telnet, SMTP ("F F S T S").</li>
<li>53 DNS, 67/68 DHCP, 69 TFTP: the "late 60s give you an address and a file".</li>
<li>110, 143: mail in. 25/587: mail out.</li>
<li>161 SNMP, 389 LDAP, 443 HTTPS, 445 SMB, 3389 RDP.</li>
</ul>`,
  map: ['Ports & protocols', '', [
    ['TCP', 'reliable, handshake', [['20/21 FTP', ''], ['22 SSH/SFTP', ''], ['23 Telnet', 'insecure'], ['25 SMTP', ''], ['80 HTTP / 443 HTTPS', ''], ['110 POP3 / 143 IMAP', ''], ['445 SMB', ''], ['3389 RDP', '']]],
    ['UDP', 'fast, connectionless', [['67/68 DHCP', ''], ['69 TFTP', ''], ['161/162 SNMP', ''], ['53 DNS', 'TCP + UDP']]],
    ['Directory', '', [['389 LDAP', '636 LDAPS'], ['137–139 NetBIOS', 'legacy']]],
    ['Secure swaps', '', [['Telnet → SSH', ''], ['HTTP → HTTPS', ''], ['FTP → SFTP/FTPS', '']]]
  ]],
  cards: `Port 20/21 | FTP (data/control), TCP
Port 22 | SSH, SFTP, SCP (TCP)
Port 23 | Telnet, cleartext remote terminal (TCP)
Port 25 | SMTP, sending email (TCP)
Port 53 | DNS (UDP queries, TCP zone transfers)
Port 67/68 | DHCP server/client (UDP)
Port 69 | TFTP (UDP)
Port 80 | HTTP (TCP)
Port 110 | POP3 (TCP)
Port 137-139 | NetBIOS over TCP/IP
Port 143 | IMAP (TCP)
Port 161/162 | SNMP / SNMP traps (UDP)
Port 389 | LDAP
Port 443 | HTTPS (TCP)
Port 445 | SMB/CIFS file sharing (TCP)
Port 3389 | RDP, Remote Desktop
TCP | Connection-oriented, reliable, 3-way handshake
UDP | Connectionless, best effort, low overhead`,
  ex: [
    ['m', 'Which port must be open to allow Remote Desktop connections?', ['3389', '22', '5900', '445'], 'RDP = 3389.'],
    ['m', 'A user can browse to http sites but not https sites. Which port is likely blocked?', ['443', '80', '53', '8080'], 'HTTPS = 443.'],
    ['m', 'Which protocol replaces Telnet for secure remote command-line access?', ['SSH', 'RDP', 'SNMP', 'TFTP'], 'SSH (22) encrypts the session.'],
    ['m', 'Which port does SFTP use?', ['22', '21', '990', '69'], 'SFTP runs over SSH on port 22.'],
    ['m', 'Users cannot reach any website by name, but pinging IP addresses works. Which service/port is failing?', ['DNS, 53', 'DHCP, 67', 'HTTP, 80', 'SMB, 445'], 'Name resolution = DNS on 53.'],
    ['m', 'Which protocol is used by monitoring software to poll switches and receive traps?', ['SNMP', 'SMTP', 'LDAP', 'RDP'], 'SNMP 161 (polls) and 162 (traps).'],
    ['m', 'Which of these protocols uses UDP only?', ['DHCP', 'SMTP', 'SSH', 'HTTPS'], 'DHCP (67/68) and TFTP (69) are UDP.'],
    ['mm', 'Which TWO protocols are used to RETRIEVE email? (Choose two.)', ['POP3', 'IMAP', 'SMTP', 'SNMP', 'SMB'], 'POP3 (110) and IMAP (143) retrieve. SMTP sends.'],
    ['mm', 'Which THREE protocols send data in cleartext and should be replaced? (Choose three.)', ['Telnet', 'FTP', 'HTTP', 'SSH', 'HTTPS'], 'Telnet, FTP and HTTP are unencrypted.'],
    ['m', 'Windows file shares are reached through which port?', ['445', '139 only', '3389', '389'], 'SMB/CIFS = 445. NetBIOS 137–139 is legacy.'],
    ['m', 'Active Directory queries for user objects use which protocol?', ['LDAP', 'SNMP', 'TFTP', 'POP3'], 'LDAP 389 (LDAPS 636).'],
    ['f', 'SMTP uses port ___ between mail servers.', ['25'], 'SMTP 25 (client submission 587).'],
    ['f', 'TFTP uses UDP port ___.', ['69'], 'TFTP = 69.'],
    ['f', 'DHCP servers listen on UDP port ___.', ['67'], 'Server 67, client 68.'],
    ['f', 'IMAP uses TCP port ___.', ['143'], 'IMAP 143, IMAPS 993.'],
    ['x', 'Match the port to the protocol.', [['21', 'FTP'], ['23', 'Telnet'], ['110', 'POP3'], ['161', 'SNMP'], ['389', 'LDAP'], ['3389', 'RDP']], 'Port-matching drag-and-drop is a staple of Core 1.'],
    ['x', 'Match each protocol to TCP or UDP (as primarily used).', [['HTTPS', 'TCP'], ['DHCP', 'UDP'], ['SSH', 'TCP'], ['TFTP', 'UDP'], ['SMB', 'TCP'], ['SNMP', 'UDP']], 'Reliability-needing protocols use TCP. Quick request/response ones use UDP.'],
    ['t', 'TCP uses a three-way handshake and retransmits lost segments.', true, 'SYN, SYN-ACK, ACK. Reliable and ordered.'],
    ['m', 'A firewall rule must allow a network device to load its config from a TFTP server. Which port and transport?', ['UDP 69', 'TCP 69', 'TCP 21', 'UDP 161'], 'TFTP = UDP 69.']
  ]
},
{
  day: 9, exam: 1, dom: '2.0', title: 'Network hardware and wireless', obj: '220-1201 · 2.2 networking hardware · 2.3 wireless protocols', deck: 'd9',
  goals: ['Explain what routers, switches, access points, firewalls and PoE do', 'Compare 802.11 standards, bands and channels', 'Know Bluetooth, NFC, RFID and Zigbee/Z-Wave uses', 'Pick hardware for a scenario'],
  concept: `
<h3>Network devices</h3>
<tb>Device;OSI layer;Job
Hub;1;Repeats everything to every port. Obsolete, one collision domain
Switch (unmanaged);2;Forwards frames by MAC address. Plug and play
Switch (managed);2 (and 3);VLANs, port security, QoS, SNMP, link aggregation, spanning tree
Router;3;Forwards packets between networks by IP. Default gateway. NAT on SOHO routers
Access point (AP);2;Connects wireless clients to the wired LAN
Firewall;3–7;Filters traffic by rules (ACLs, ports, apps). Hardware or software
Patch panel;1;Punch-down termination point for structured cabling
Cable modem / DSL modem / ONT;1;Converts ISP signal (coax / phone line / fibre) to Ethernet
NIC;2;Network interface card, has a MAC address
PoE switch / injector;1;Power over Ethernet for APs, cameras, VoIP phones</tb>
<p><b>PoE standards</b>: 802.3af (PoE, 15.4 W), 802.3at (PoE+, 30 W), 802.3bt (PoE++, 60–100 W). An <b>injector</b> adds PoE to one link when the switch has none.</p>
<p><b>SDN</b> (software-defined networking): control plane managed centrally in software, separate from the data plane.</p>
<h3>Wi-Fi standards</h3>
<tb>Standard;Name;Band;Max (theoretical)
802.11a;;5 GHz;54 Mb/s
802.11b;;2.4 GHz;11 Mb/s
802.11g;;2.4 GHz;54 Mb/s
802.11n;Wi-Fi 4;2.4 + 5 GHz;600 Mb/s (MIMO)
802.11ac;Wi-Fi 5;5 GHz;~6.9 Gb/s (MU-MIMO down)
802.11ax;Wi-Fi 6 / 6E;2.4 + 5 (+ 6 GHz for 6E);~9.6 Gb/s (OFDMA)
802.11be;Wi-Fi 7;2.4 + 5 + 6 GHz;~46 Gb/s (multi-link operation)</tb>
<h3>Bands and channels</h3>
<ul>
<li><b>2.4 GHz</b>: longer range, better through walls, more interference (microwaves, Bluetooth, cordless phones). Non-overlapping channels in North America: <b>1, 6, 11</b>.</li>
<li><b>5 GHz</b>: faster, more channels, shorter range. <b>6 GHz</b> (Wi-Fi 6E/7): even more clean channels, shortest range.</li>
<li>Channel width: 20, 40, 80, 160 (320 on Wi-Fi 7) MHz. Wider = faster but more interference.</li>
<li>Regulations: channels and power vary by country (set the correct country code).</li>
</ul>
<n>Overlapping neighbours on 2.4 GHz? Move to channel 1, 6 or 11, or move clients to 5 GHz.</n>
<h3>Other wireless</h3>
<tb>Tech;Range;Use
Bluetooth;~10 m (class 2);Headsets, keyboards, PAN
NFC;under 4 cm;Payments, badges, pairing
RFID;cm to metres;Inventory tags, access badges
Zigbee / Z-Wave;Mesh, low power;Smart home and IoT sensors
Cellular 4G/5G;km;WWAN</tb>`,
  map: ['Network hardware & wireless', '', [
    ['Devices', '', [['switch', 'L2, MAC'], ['managed switch', 'VLAN, QoS'], ['router', 'L3, IP, gateway'], ['AP', 'wireless to wired'], ['firewall', 'rules'], ['patch panel', 'punch-down'], ['modem / ONT', 'ISP handoff']]],
    ['PoE', '', [['af 15.4 W', ''], ['at 30 W', 'PoE+'], ['bt 60–100 W', ''], ['injector', 'single link']]],
    ['802.11', '', [['n Wi-Fi 4', '2.4/5'], ['ac Wi-Fi 5', '5 only'], ['ax Wi-Fi 6/6E', '+6 GHz'], ['be Wi-Fi 7', 'MLO']]],
    ['Bands', '', [['2.4', 'range, 1/6/11'], ['5', 'speed'], ['6', 'clean, short']]],
    ['Other', '', [['Bluetooth', '10 m'], ['NFC', 'cm'], ['RFID', 'tags'], ['Zigbee/Z-Wave', 'IoT mesh']]]
  ]],
  cards: `Switch | Layer 2 device that forwards frames by MAC address
Router | Layer 3 device that forwards packets between networks
Managed switch | Supports VLANs, QoS, port security, SNMP
Access point | Connects wireless clients to a wired network
Patch panel | Termination point for structured cabling (punch-down)
ONT | Optical network terminal, fibre to Ethernet at the customer
802.3af | PoE, 15.4 W per port
802.3at | PoE+, 30 W per port
802.3bt | PoE++, 60 to 100 W
PoE injector | Adds power to one Ethernet link
802.11ac | Wi-Fi 5, 5 GHz only
802.11ax | Wi-Fi 6 (2.4/5 GHz), 6E adds 6 GHz
802.11be | Wi-Fi 7, 2.4/5/6 GHz, multi-link operation
802.11n | Wi-Fi 4, 2.4 and 5 GHz, MIMO
Non-overlapping 2.4 GHz channels | 1, 6, 11
2.4 vs 5 GHz | 2.4 = range and penetration. 5 = speed, less interference
Zigbee / Z-Wave | Low-power mesh protocols for smart home / IoT
SDN | Software-defined networking: centralized control plane`,
  ex: [
    ['m', 'A company wants to install ceiling access points where there are no power outlets. Which solution?', ['PoE switch or PoE injectors', 'Longer Ethernet cables', 'Powerline adapters', 'A hub'], 'PoE delivers power and data over the same cable.'],
    ['m', 'Which device forwards traffic between different IP networks?', ['Router', 'Unmanaged switch', 'Hub', 'Patch panel'], 'Routers work at layer 3.'],
    ['m', 'Which switch feature separates broadcast domains for different departments on the same hardware?', ['VLANs', 'PoE', 'Auto-MDIX', 'Jumbo frames'], 'VLANs are a managed-switch feature.'],
    ['m', 'Which Wi-Fi standard operates ONLY in the 5 GHz band?', ['802.11ac', '802.11n', '802.11ax', '802.11g'], 'Wi-Fi 5 (ac) is 5 GHz only.'],
    ['m', 'Which standard added the 6 GHz band?', ['Wi-Fi 6E (802.11ax)', 'Wi-Fi 5', 'Wi-Fi 4', '802.11b'], 'Wi-Fi 6E extends 802.11ax into 6 GHz. Wi-Fi 7 also uses it.'],
    ['m', 'An office on 2.4 GHz has heavy interference from neighbours. Which channels should the AP use?', ['1, 6 or 11', '2, 4 or 8', '3, 7 or 12', 'Any channel, they do not overlap'], 'Only 1, 6 and 11 do not overlap in North America.'],
    ['m', 'Users far from the AP and behind concrete walls get poor speeds on 5 GHz. What helps MOST?', ['Connect them on 2.4 GHz or add an access point', 'Set channel width to 160 MHz', 'Switch to 6 GHz', 'Disable WPA3'], '2.4 GHz travels farther and through walls. Adding an AP is best.'],
    ['mm', 'Which TWO are typical uses of RFID? (Choose two.)', ['Inventory tracking tags', 'Building access badges', 'Gigabit file transfer', 'Video streaming', 'Wi-Fi roaming'], 'RFID: asset tags and badges.'],
    ['m', 'Which PoE standard provides up to 30 W per port?', ['802.3at (PoE+)', '802.3af', '802.3bt', '802.11ax'], 'af 15.4 W, at 30 W, bt up to 90–100 W.'],
    ['m', 'Where are horizontal cable runs from offices terminated in the wiring closet?', ['Patch panel', 'Router', 'Access point', 'Modem'], 'Runs are punched down on a patch panel, then patched to switches.'],
    ['m', 'A smart-home vendor uses a low-power mesh protocol for door sensors and bulbs. It is MOST likely:', ['Zigbee or Z-Wave', 'Wi-Fi 7', 'Thunderbolt', 'NFC'], 'Zigbee and Z-Wave are low-power IoT mesh protocols.'],
    ['f', 'A Layer 2 device that forwards frames using MAC addresses is a ___.', ['switch', 'network switch'], 'Switches build a MAC address table.'],
    ['f', 'Wi-Fi 6 is the IEEE standard 802.11___.', ['ax'], '802.11ax = Wi-Fi 6/6E.'],
    ['x', 'Match the Wi-Fi standard to its name.', [['802.11n', 'Wi-Fi 4'], ['802.11ac', 'Wi-Fi 5'], ['802.11ax', 'Wi-Fi 6'], ['802.11be', 'Wi-Fi 7']], 'Generational names.'],
    ['x', 'Match the device to its role.', [['Firewall', 'Filters traffic by rules'], ['Access point', 'Bridges wireless clients to the LAN'], ['Cable modem', 'Converts coax ISP signal to Ethernet'], ['Managed switch', 'VLANs, QoS, port security'], ['PoE injector', 'Adds power to a single link']], 'Device roles.'],
    ['t', '5 GHz Wi-Fi generally offers higher speed but shorter range than 2.4 GHz.', true, 'Higher frequency = more bandwidth, less penetration.'],
    ['m', 'A fibre ISP installs a box that converts the optical signal to Ethernet for the router. That box is the:', ['ONT', 'DSL modem', 'Patch panel', 'Repeater'], 'Optical Network Terminal.']
  ]
},
{
  day: 10, exam: 1, dom: '2.0', title: 'IP addressing, DHCP, DNS and network services', obj: '220-1201 · 2.4 services provided by networked hosts · 2.5 SOHO networks · 2.6 network configuration concepts', deck: 'd10',
  goals: ['Read IPv4 addresses, masks, private ranges and APIPA', 'Explain DHCP scope, leases, reservations and exclusions', 'Know the DNS record types including SPF, DKIM, DMARC', 'Describe server roles, VLAN and VPN'],
  concept: `
<h3>IPv4</h3>
<ul>
<li>32 bits, four octets: <f>192.168.1.25</f>. The <b>subnet mask</b> splits network and host: <f>255.255.255.0</f> = /24.</li>
<li><b>Default gateway</b> = router IP for reaching other networks.</li>
<li><b>Private ranges</b> (RFC 1918, not routed on the internet, need NAT): <f>10.0.0.0/8</f>, <f>172.16.0.0–172.31.255.255 (/12)</f>, <f>192.168.0.0/16</f>.</li>
<li><b>APIPA</b>: <f>169.254.x.x</f>. Windows assigns it when DHCP fails. Local-only communication.</li>
<li><b>Loopback</b>: <f>127.0.0.1</f> tests the local TCP/IP stack.</li>
<li><b>Static</b> vs <b>dynamic</b> (DHCP) addressing. Servers, printers and network gear usually get static or reserved IPs.</li>
</ul>
<t>An address starting with <b>169.254</b> means the PC could not reach a DHCP server. Check the cable/Wi-Fi, the DHCP server and the scope.</t>
<h3>IPv6</h3>
<p>128 bits, hexadecimal, colon-separated: <f>2001:db8::1</f>. Leading zeros can be dropped and one run of zero groups replaced with <f>::</f>. <b>Link-local</b> starts with <f>fe80::</f>. Loopback <f>::1</f>. No need for NAT. SLAAC lets hosts self-configure.</p>
<h3>DHCP</h3>
<tb>Term;Meaning
Scope;Range of addresses the server can hand out
Lease;How long a client keeps the address
Reservation;Same IP always given to a specific MAC address
Exclusion;Addresses in the scope the server will never hand out (e.g. for static devices)
Options;Also hands out gateway, DNS servers, domain name
DORA;Discover, Offer, Request, Acknowledge</tb>
<h3>DNS records</h3>
<tb>Record;Purpose
A;Name → IPv4 address
AAAA;Name → IPv6 address
CNAME;Alias → another name
MX;Mail server for a domain
TXT;Text. Used for SPF, DKIM, DMARC and domain verification
SPF;TXT listing servers allowed to send mail for the domain
DKIM;TXT holding a public key to verify signed email
DMARC;TXT policy: what to do when SPF/DKIM fail, and where to send reports</tb>
<h3>Server roles (networked hosts)</h3>
<p>DNS, DHCP, file share, print server, mail server, syslog (central log collection), web server, AAA (authentication, authorization, accounting: RADIUS/TACACS+), database. Internet appliances: <b>spam gateway</b>, <b>UTM</b> (all-in-one firewall/IPS/AV), <b>load balancer</b>, <b>proxy server</b>. Legacy/embedded systems: SCADA, ICS. <b>IoT</b> devices: thermostats, cameras, bulbs, door locks (isolate them).</p>
<h3>VLAN and VPN</h3>
<ul>
<li><b>VLAN</b>: logical segmentation on a switch. Separate broadcast domains for departments, guests, IoT, VoIP.</li>
<li><b>VPN</b>: encrypted tunnel over the internet. Remote access (user to office) or site-to-site.</li>
</ul>`,
  map: ['IP & services', '', [
    ['IPv4', '', [['mask /24', '255.255.255.0'], ['gateway', 'router'], ['private', '10 / 172.16–31 / 192.168'], ['APIPA 169.254', 'DHCP failed'], ['127.0.0.1', 'loopback']]],
    ['IPv6', '', [['128-bit hex', '::'], ['fe80::', 'link-local'], ['::1', 'loopback']]],
    ['DHCP', 'DORA', [['scope, lease', ''], ['reservation', 'MAC → IP'], ['exclusion', 'never hand out']]],
    ['DNS', '', [['A / AAAA', ''], ['CNAME', 'alias'], ['MX', 'mail'], ['TXT: SPF DKIM DMARC', 'email auth']]],
    ['Segmentation', '', [['VLAN', 'logical LAN'], ['VPN', 'encrypted tunnel']]]
  ]],
  cards: `APIPA | 169.254.x.x, self-assigned when DHCP fails
Loopback IPv4 | 127.0.0.1
Loopback IPv6 | ::1
IPv6 link-local prefix | fe80::/10
Class A private range | 10.0.0.0/8
Class B private range | 172.16.0.0 to 172.31.255.255
Class C private range | 192.168.0.0/16
/24 subnet mask | 255.255.255.0
DHCP reservation | Fixed IP handed to a specific MAC address
DHCP exclusion | Addresses in the scope never handed out
DORA | DHCP: Discover, Offer, Request, Acknowledge
A record | Hostname to IPv4
AAAA record | Hostname to IPv6
CNAME | Alias to another hostname
MX record | Mail exchanger for a domain
SPF | TXT record listing authorized sending mail servers
DKIM | TXT record with public key to verify email signatures
DMARC | TXT policy for SPF/DKIM failures and reporting
Syslog | Central collection of logs (UDP 514)
UTM | Unified threat management: firewall + IPS + AV + filtering in one`,
  ex: [
    ['m', 'A workstation shows the IP address 169.254.12.40 and cannot reach the internet. What does this indicate?', ['It could not obtain an address from DHCP', 'It has a static IP conflict', 'DNS is misconfigured', 'It is using IPv6'], '169.254.x.x is APIPA, used when DHCP fails.'],
    ['m', 'Which of these is a private IPv4 address?', ['172.20.5.4', '172.32.1.1', '8.8.8.8', '192.169.0.1'], 'Private class B is 172.16.0.0–172.31.255.255.'],
    ['m', 'A network printer must always receive the same IP from DHCP. Configure a:', ['Reservation', 'Exclusion', 'Shorter lease', 'New scope'], 'Reservation binds an IP to the printer MAC.'],
    ['m', 'Servers are configured with static IPs 192.168.1.1–20 inside the DHCP range. What stops DHCP handing those out?', ['An exclusion range', 'A reservation', 'A CNAME', 'APIPA'], 'Exclusions keep addresses out of the pool.'],
    ['m', 'Which DNS record points a domain to its mail server?', ['MX', 'A', 'CNAME', 'PTR'], 'MX = mail exchanger.'],
    ['m', 'Which DNS record maps a hostname to an IPv6 address?', ['AAAA', 'A', 'MX', 'TXT'], 'Quad-A for IPv6.'],
    ['m', 'Customers report emails from the company land in spam because receivers cannot verify which servers may send for the domain. Add a:', ['SPF TXT record', 'CNAME record', 'AAAA record', 'DHCP option'], 'SPF lists authorized sending servers.'],
    ['mm', 'Which THREE email-authentication mechanisms are published as DNS TXT records? (Choose three.)', ['SPF', 'DKIM', 'DMARC', 'MX', 'CNAME'], 'SPF, DKIM and DMARC are all TXT records.'],
    ['m', 'What does a ping to 127.0.0.1 test?', ['The local TCP/IP stack', 'The default gateway', 'The DNS server', 'The internet connection'], 'Loopback never leaves the host.'],
    ['m', 'Which IPv6 address is link-local?', ['fe80::1a2b:3c4d', '2001:db8::5', '::1', 'ff02::1'], 'fe80::/10 is link-local. ::1 is loopback. ff02 is multicast.'],
    ['s', 'Order the DHCP lease process.', ['Discover', 'Offer', 'Request', 'Acknowledge'], 'DORA.'],
    ['m', 'Which appliance combines firewall, intrusion prevention, antivirus and content filtering?', ['UTM', 'Load balancer', 'Proxy server', 'Syslog server'], 'Unified Threat Management.'],
    ['m', 'Which server collects log messages from many network devices in one place?', ['Syslog', 'DHCP', 'DNS', 'Print server'], 'Syslog centralises logs (UDP 514).'],
    ['f', 'The subnet mask for /24 is 255.255.255.___.', ['0'], '/24 = 24 one-bits = 255.255.255.0.'],
    ['f', 'A DNS ___ record creates an alias that points to another hostname.', ['CNAME', 'canonical name'], 'CNAME = canonical name alias.'],
    ['x', 'Match the DNS record to its purpose.', [['A', 'Hostname to IPv4'], ['AAAA', 'Hostname to IPv6'], ['MX', 'Mail server'], ['CNAME', 'Alias'], ['TXT', 'Text such as SPF']], 'DNS record matching.'],
    ['t', 'A VPN creates an encrypted tunnel across an untrusted network such as the internet.', true, 'Remote-access and site-to-site VPNs.'],
    ['m', 'A company wants guest Wi-Fi users kept off the internal network while using the same switches. Use:', ['A separate VLAN', 'A different DNS server', 'APIPA', 'A longer DHCP lease'], 'VLANs segment traffic logically.']
  ]
},
{
  day: 11, exam: 1, dom: '2.0', title: 'Internet connections, network types and networking tools', obj: '220-1201 · 2.7 internet connection types and network types · 2.8 networking tools · SOHO setup', deck: 'd11',
  goals: ['Compare fibre, cable, DSL, satellite, cellular and WISP', 'Define LAN, WAN, PAN, MAN, SAN, WLAN', 'Use cable testers, crimpers, toners, loopbacks and Wi-Fi analyzers', 'Know cable categories and T568A/B'],
  concept: `
<h3>Internet connection types</h3>
<tb>Type;Medium;Notes
Fibre (FTTH);Light through glass;Fastest, symmetrical options, low latency
Cable;Coax (DOCSIS);Fast, shared neighbourhood bandwidth
DSL;Phone line;Speed drops with distance from the exchange. ADSL = asymmetric
Satellite;Dish;Available anywhere. GEO = high latency. LEO (e.g. Starlink) much lower latency. Rain fade
Cellular (4G/5G);Radio;Mobile hotspot or fixed wireless home internet
WISP;Fixed radio link to a tower;Rural line-of-sight wireless</tb>
<h3>Network types</h3>
<tb>Type;Scope
PAN;Personal area, Bluetooth around one person
LAN;Single building/site
WLAN;Wireless LAN
MAN;City/campus
WAN;Large geographic area, links LANs (the internet is the largest)
SAN;Storage area network: block storage for servers (Fibre Channel, iSCSI)</tb>
<h3>Copper and fibre cabling</h3>
<tb>Cable;Max speed at 100 m
Cat 5e;1 Gb/s
Cat 6;1 Gb/s at 100 m (10 Gb/s up to 55 m)
Cat 6a;10 Gb/s
Cat 7/8;10 Gb/s / 25–40 Gb/s (Cat 8 only ~30 m)</tb>
<ul>
<li>UTP (unshielded), STP (shielded, near EMI sources). <b>Plenum</b>-rated jacket for air-handling spaces (low smoke). Direct burial for outdoors.</li>
<li>Copper Ethernet max length: <b>100 m</b>.</li>
<li><b>T568A and T568B</b> wiring. Same standard both ends = straight-through. A on one end, B on the other = crossover (modern ports auto-MDIX).</li>
<li>Fibre: single-mode (long distance, laser) vs multimode (shorter, LED). Connectors LC, SC, ST.</li>
</ul>
<n>T568B order: white-orange, orange, white-green, blue, white-blue, green, white-brown, brown. T568A swaps the orange and green pairs.</n>
<h3>Networking tools</h3>
<tb>Tool;Use
Crimper;Attaches RJ45/RJ11 connectors to cable
Cable stripper;Removes the outer jacket
Punchdown tool;Terminates wires in patch panels and keystone jacks (110 block)
Cable tester;Checks continuity, wiring order, opens/shorts
Toner probe (tone generator);Traces which cable is which in a bundle or wall
Loopback plug;Tests a NIC or port by sending signal back to itself
Wi-Fi analyzer;Shows SSIDs, channels, signal strength, interference
Network tap;Copies traffic for monitoring
Multimeter;Voltage, resistance, continuity</tb>
<h3>SOHO router setup checklist</h3>
<p>Change default admin password, update firmware, set WPA3 (or WPA2-AES), change default SSID, disable WPS, set DHCP scope and reservations, configure port forwarding / DMZ only when needed, enable the firewall, disable UPnP if unused, consider a guest network.</p>`,
  map: ['Connections & tools', '', [
    ['Internet', '', [['fibre', 'fastest'], ['cable', 'coax, shared'], ['DSL', 'distance limited'], ['satellite', 'latency, rain'], ['cellular / WISP', 'radio']]],
    ['Network types', '', [['PAN', 'Bluetooth'], ['LAN / WLAN', 'site'], ['MAN', 'city'], ['WAN', 'wide'], ['SAN', 'storage']]],
    ['Cabling', '', [['Cat 5e 1G', ''], ['Cat 6a 10G', ''], ['100 m max', ''], ['plenum', 'air spaces'], ['T568A/B', '']]],
    ['Tools', '', [['crimper', 'RJ45'], ['punchdown', 'patch panel'], ['cable tester', 'wiring'], ['toner probe', 'trace'], ['loopback', 'port test'], ['Wi-Fi analyzer', 'channels']]]
  ]],
  cards: `PAN | Personal area network (Bluetooth)
MAN | Metropolitan area network (city/campus)
SAN | Storage area network: block storage for servers
WISP | Wireless ISP, fixed line-of-sight radio
DSL limitation | Speed drops with distance from the provider
Satellite drawback | High latency (GEO) and rain fade
Cat 5e | 1 Gb/s at 100 m
Cat 6a | 10 Gb/s at 100 m
Copper Ethernet max length | 100 m
Plenum cable | Fire-retardant, low-smoke jacket for air-handling spaces
T568B order | W-O, O, W-G, B, W-B, G, W-Br, Br
Crossover cable | T568A on one end, T568B on the other
Toner probe | Traces and identifies a cable in a bundle
Loopback plug | Tests a port/NIC by looping signal back
Punchdown tool | Terminates wires in patch panels and keystone jacks
Wi-Fi analyzer | Shows SSIDs, channels, signal and interference
Single-mode fibre | Long distance, laser light source`,
  ex: [
    ['m', 'A technician must find which unlabelled cable in a ceiling bundle goes to office 12. Which tool?', ['Toner probe', 'Crimper', 'Loopback plug', 'Punchdown tool'], 'Tone generator + probe traces cables.'],
    ['m', 'Which tool terminates wires into a patch panel?', ['Punchdown tool', 'Crimper', 'Cable stripper', 'Multimeter'], '110 punchdown tool.'],
    ['m', 'A new patch cable fails. Which tool verifies its pin-out and continuity?', ['Cable tester', 'Wi-Fi analyzer', 'Toner probe', 'Network tap'], 'Cable testers check wiring order, opens and shorts.'],
    ['m', 'A user in a rural area with no wired service needs internet but latency matters for video calls. BEST option?', ['LEO satellite or cellular', 'GEO satellite', 'Dial-up', 'DSL'], 'LEO satellite and cellular have far lower latency than GEO satellite.'],
    ['m', 'Which connection type slows down the farther the customer is from the provider\'s equipment?', ['DSL', 'Fibre', 'Cable', 'Satellite'], 'DSL degrades with distance on copper phone lines.'],
    ['m', 'Cable must run through the air space above a drop ceiling used for HVAC return. Which cable?', ['Plenum-rated', 'PVC jacketed', 'Direct burial', 'Coaxial RG-59'], 'Plenum jackets produce less toxic smoke.'],
    ['m', 'What is the maximum length of a Cat 6a copper Ethernet run?', ['100 m', '55 m', '185 m', '500 m'], 'Twisted-pair Ethernet: 100 m.'],
    ['m', 'Which category is the minimum for 10 Gb/s at 100 m?', ['Cat 6a', 'Cat 5e', 'Cat 6', 'Cat 5'], 'Cat 6 does 10G only to ~55 m.'],
    ['mm', 'Which TWO tools are needed to make a new Ethernet patch cable? (Choose two.)', ['Crimper', 'Cable stripper', 'Toner probe', 'Loopback plug', 'Wi-Fi analyzer'], 'Strip the jacket, then crimp RJ45 connectors (then test).'],
    ['m', 'A dedicated network giving servers block-level access to shared storage is a:', ['SAN', 'PAN', 'MAN', 'WLAN'], 'SAN: Fibre Channel or iSCSI.'],
    ['m', 'Users complain about slow Wi-Fi in one area. Which tool shows channel overlap and signal strength?', ['Wi-Fi analyzer', 'Multimeter', 'Crimper', 'Loopback plug'], 'Wi-Fi analyzers map SSIDs, channels and RSSI.'],
    ['s', 'Order the T568B colour sequence, pin 1 to pin 8.', ['White-orange', 'Orange', 'White-green', 'Blue', 'White-blue', 'Green', 'White-brown', 'Brown'], 'T568B is the most common termination.'],
    ['f', 'A network covering a single person\'s devices via Bluetooth is a ___.', ['PAN', 'personal area network'], 'PAN.'],
    ['f', 'Copper twisted-pair Ethernet has a maximum segment length of ___ metres.', ['100', '100m', '100 m'], '100 m.'],
    ['x', 'Match the tool to the job.', [['Crimper', 'Attach RJ45 connectors'], ['Punchdown tool', 'Terminate on a patch panel'], ['Toner probe', 'Trace a cable'], ['Loopback plug', 'Test a NIC port'], ['Wi-Fi analyzer', 'Find channel overlap']], 'Networking tools PBQ.'],
    ['t', 'A crossover cable uses T568A on one end and T568B on the other.', true, 'Modern NICs auto-MDIX, so straight-through usually works anyway.'],
    ['m', 'When setting up a new SOHO router, what should be done FIRST for security?', ['Change the default admin password', 'Enable UPnP', 'Enable WPS', 'Open port 3389'], 'Default credentials are public. Change them first, then update firmware.']
  ]
},
{
  day: 12, exam: 1, dom: '4.0', title: 'Virtualization and cloud computing', obj: '220-1201 · 4.1 virtualization concepts · 4.2 cloud computing concepts', deck: 'd12',
  goals: ['Compare Type 1 and Type 2 hypervisors and containers', 'Explain VM requirements, snapshots, sandboxing and VDI', 'Define IaaS, PaaS, SaaS and public/private/hybrid/community', 'Know elasticity, metered use, high availability and shared resources'],
  concept: `
<h3>Virtualization</h3>
<tb>Item;Know this
Hypervisor;Software that runs virtual machines
Type 1 (bare metal);Runs directly on hardware: VMware ESXi, Microsoft Hyper-V (server), Proxmox, Xen. Data centres
Type 2 (hosted);Runs on top of an OS: VirtualBox, VMware Workstation, Parallels. Desktops/labs
Container;Packages an app with its dependencies, shares the host OS kernel (Docker). Lighter than a VM
VM requirements;CPU with VT-x/AMD-V enabled, enough RAM and disk for host + all guests, network (virtual switch)
Snapshot;Point-in-time copy of a VM, quick rollback before changes. Not a long-term backup
Sandbox;Isolated environment to test software or open suspicious files
Test / development;Spin up copies without touching production
Legacy software / OS;Run old apps in an old OS VM
Cross-platform;Run Linux on Windows, etc.</tb>
<p>Virtual networking: <b>NAT</b> (VM shares host IP), <b>bridged</b> (VM gets its own IP on the LAN), <b>internal/host-only</b> (VMs talk only to each other/host).</p>
<t>Security: VM escape (attacker breaks out to the host), VM sprawl (forgotten unpatched VMs). Each guest OS needs its own licence, patches and antivirus.</t>
<h3>VDI</h3>
<p><b>Virtual desktop infrastructure</b>: user desktops run as VMs in the data centre or cloud, accessed from thin clients or any device. Easier management, data stays central. Needs reliable network.</p>
<h3>Cloud service models</h3>
<tb>Model;You manage;Provider manages;Example
IaaS;OS, apps, data;Hardware, network, virtualization;Azure VMs, AWS EC2
PaaS;Apps and data;Plus OS, runtime, middleware;Azure App Service, Google App Engine
SaaS;Just your data and users;Everything;Microsoft 365, Gmail, Salesforce</tb>
<h3>Deployment models</h3>
<tb>Model;Description
Public;Shared provider infrastructure, pay as you go
Private;Dedicated to one organisation (on-prem or hosted)
Hybrid;Mix of public and private, connected
Community;Shared by organisations with common needs (e.g. hospitals, government)</tb>
<h3>Cloud characteristics</h3>
<ul>
<li><b>Elasticity / rapid elasticity</b>: scale resources up and down automatically with demand.</li>
<li><b>Metered utilization</b>: pay for what you use.</li>
<li><b>Shared resources</b>: multi-tenancy, provider pools hardware.</li>
<li><b>High availability</b>: redundancy across zones/regions.</li>
<li><b>Ingress / egress</b>: data in is often free, data out is charged.</li>
<li><b>File synchronization</b>: OneDrive, Google Drive, Dropbox keep files the same across devices.</li>
<li><b>Availability</b> measured in nines (99.9% etc.) in an SLA.</li>
</ul>`,
  map: ['Virtualization & cloud', '', [
    ['Hypervisors', '', [['Type 1', 'bare metal: ESXi, Hyper-V'], ['Type 2', 'hosted: VirtualBox'], ['containers', 'share kernel']]],
    ['VM use', '', [['sandbox', ''], ['test/dev', ''], ['legacy OS', ''], ['snapshots', 'rollback'], ['VDI', 'desktops in DC']]],
    ['Service', '', [['IaaS', 'you run the OS'], ['PaaS', 'you run the app'], ['SaaS', 'you just use it']]],
    ['Deployment', '', [['public', ''], ['private', ''], ['hybrid', ''], ['community', '']]],
    ['Traits', '', [['elasticity', 'scale with demand'], ['metered', 'pay per use'], ['shared', 'multi-tenant'], ['HA', 'redundant']]]
  ]],
  cards: `Type 1 hypervisor | Bare metal, runs directly on hardware (ESXi, Hyper-V, Proxmox)
Type 2 hypervisor | Hosted, runs on an OS (VirtualBox, VMware Workstation)
Container | App + dependencies sharing the host kernel (Docker)
Snapshot | Point-in-time copy of a VM for quick rollback
Sandbox | Isolated environment for testing untrusted software
VDI | Virtual desktops hosted centrally, accessed remotely
IaaS | Provider runs hardware/virtualization. You manage OS and up
PaaS | Provider also runs OS/runtime. You deploy apps
SaaS | Provider runs everything. You use the application
Public cloud | Shared multi-tenant provider infrastructure
Private cloud | Dedicated to one organization
Hybrid cloud | Combination of public and private
Community cloud | Shared by organizations with common requirements
Rapid elasticity | Resources scale up/down automatically with demand
Metered utilization | Pay only for what you use
Bridged networking (VM) | VM gets its own IP on the physical LAN
VM escape | Attack that breaks out of a guest into the host`,
  ex: [
    ['m', 'Which hypervisor type runs directly on the server hardware without a host OS?', ['Type 1', 'Type 2', 'Container engine', 'Emulator'], 'Type 1 = bare metal.'],
    ['m', 'A student wants to run Linux VMs on their Windows 11 laptop for a course. Which is MOST appropriate?', ['Type 2 hypervisor such as VirtualBox', 'Type 1 hypervisor such as ESXi', 'A SAN', 'A thin client'], 'Type 2 runs on top of an existing OS.'],
    ['m', 'Before installing a risky update in a VM, the admin wants a quick way to roll back. Take a:', ['Snapshot', 'Full image backup to tape', 'Clone to a new host', 'Container image'], 'Snapshots enable fast rollback.'],
    ['m', 'A company uses Microsoft 365 for email and Office apps. Which cloud model?', ['SaaS', 'PaaS', 'IaaS', 'On-premises'], 'The provider runs everything: SaaS.'],
    ['m', 'Developers deploy code without managing servers or the OS. Which model?', ['PaaS', 'SaaS', 'IaaS', 'Private cloud'], 'PaaS provides the runtime platform.'],
    ['m', 'A company rents virtual servers and installs and patches its own OS. Which model?', ['IaaS', 'SaaS', 'PaaS', 'DaaS'], 'IaaS: you manage OS and above.'],
    ['m', 'An online store automatically adds servers during holiday traffic and removes them after. This is:', ['Rapid elasticity', 'High availability', 'Community cloud', 'Snapshot'], 'Elasticity = scale with demand.'],
    ['m', 'Several hospitals share a cloud built to meet the same health-privacy regulations. Which deployment?', ['Community', 'Public', 'Private', 'Hybrid'], 'Community clouds serve organisations with shared requirements.'],
    ['mm', 'Which TWO are required on a workstation that will host VMs? (Choose two.)', ['CPU virtualization extensions enabled in firmware', 'Sufficient RAM for host and guests', 'A Type 1 hypervisor only', 'A RAID 6 array', 'A dedicated sound card'], 'VT-x/AMD-V and enough RAM are the essentials.'],
    ['m', 'Which technology packages an application with its libraries but shares the host OS kernel?', ['Container', 'Type 1 hypervisor', 'VDI', 'Dual boot'], 'Containers are lighter than VMs.'],
    ['m', 'A VM must be reachable by other PCs on the office LAN with its own IP. Which VM network mode?', ['Bridged', 'NAT', 'Host-only', 'Internal'], 'Bridged places the VM directly on the LAN.'],
    ['m', 'A security analyst wants to open a suspicious attachment safely. Use a:', ['Sandbox VM', 'Production workstation', 'Domain controller', 'Hybrid cloud'], 'Sandboxes isolate untrusted code.'],
    ['f', 'Cloud billing where you pay only for resources consumed is called ___ utilization.', ['metered'], 'Metered utilization.'],
    ['f', 'Desktops hosted as VMs in a data centre and accessed remotely are called ___.', ['VDI', 'virtual desktop infrastructure'], 'VDI.'],
    ['x', 'Match the example to the cloud model.', [['Gmail', 'SaaS'], ['AWS EC2 virtual server', 'IaaS'], ['Azure App Service', 'PaaS'], ['Salesforce CRM', 'SaaS']], 'Service model matching.'],
    ['x', 'Match the hypervisor to its type.', [['VMware ESXi', 'Type 1'], ['Microsoft Hyper-V Server', 'Type 1'], ['Oracle VirtualBox', 'Type 2'], ['VMware Workstation', 'Type 2']], 'Bare metal vs hosted.'],
    ['t', 'Each guest operating system in a VM still needs its own licensing, patching and security software.', true, 'Virtualization does not remove OS management duties.']
  ]
},
{
  day: 13, exam: 1, dom: '5.0', title: 'Hardware and network troubleshooting', obj: '220-1201 · 5.2 motherboard/RAM/CPU/power · 5.3 storage · 5.4 video · 5.5 mobile · 5.6 printers · 5.7 network', deck: 'd13',
  goals: ['Map symptoms to causes for power, RAM, CPU, storage and display faults', 'Troubleshoot mobile device hardware issues', 'Diagnose wired and wireless network problems', 'Pick the right tool or first step for each'],
  concept: `
<h3>Motherboard, RAM, CPU, power</h3>
<tb>Symptom;Likely cause / action
No power, no fans;Outlet, power cable, PSU switch, PSU
Fans spin, no POST, no display;RAM seating, CPU, motherboard, PSU. Listen to beep codes
Beep codes / POST error;Look up the code (RAM and video most common)
Random shutdowns / reboots;Overheating (dust, fan, paste), PSU, failing RAM
BSOD / kernel panic / pinwheel;RAM, drivers, overheating. Check the stop code
Wrong date/time, settings reset;CMOS battery
Burning smell, smoke;Power off immediately. PSU or component failure
Capacitor swelling / leaking;Replace the motherboard
Intermittent freezes;RAM (run memory diagnostics), heat, drive
Overheating;Clean dust, check fans, reapply paste, airflow
Loud noise / grinding;Failing fan or HDD
Sluggish performance;Thermal throttling, RAM full, failing drive</tb>
<h3>Storage</h3>
<tb>Symptom;Likely cause
Clicking / grinding;Failing HDD: back up NOW
Read/write failures, slow;Failing drive. Check S.M.A.R.T.
Bootable device not found;Boot order, disconnected drive, failed drive, corrupt boot record
Missing drives in OS;Cable, power, not initialised, driver
RAID array degraded / failure;Replace failed drive, let it rebuild
LED status indicators (amber);Drive fault in an array
Extended read/write times / IOPS low;Failing disk, fragmentation (HDD only)</tb>
<h3>Video and display</h3>
<tb>Symptom;Likely cause
No image;Wrong input source, cable, monitor power, GPU
Dim image;Backlight or brightness setting
Flickering;Cable, refresh rate, failing backlight/inverter
Dead pixels / stuck pixels;Panel defect
Burn-in;OLED/plasma static image
Incorrect colour display;Cable (VGA pin), colour profile, driver
Distorted / fuzzy image;Non-native resolution, VGA quality
Projector shuts off / dim;Overheating (clean filter), lamp end of life
Display artifacts;Overheating or failing GPU, driver</tb>
<h3>Mobile devices</h3>
<p>Poor battery health (replace), swollen battery (stop using), broken screen, liquid damage, overheating, digitizer issues, physically damaged ports, malware, cursor drift on touchpad (calibrate / clean), degraded performance, no charging (port debris, cable, adapter).</p>
<h3>Network</h3>
<tb>Symptom;Likely cause / first check
No connectivity, APIPA address;DHCP server, cable, switch port
Limited / intermittent connectivity;Cable damage, interference, duplex mismatch
IP conflict;Static IP inside DHCP scope. Use exclusions/reservations
Slow speeds;Interference, bandwidth saturation, wrong band, bad cable
Can ping IP but not names;DNS
Can reach local but not internet;Default gateway / router / ISP
Low RF signal / SSID not found;Distance, obstacles, AP down, band unsupported
Jitter / VoIP drops;Latency variation: QoS, congestion
Port flapping;Faulty cable/NIC, link going up and down
High latency;Congestion, satellite link, routing
External interference;Microwaves, cordless phones, neighbouring APs</tb>
<k>Order for network faults: physical (link light, cable) → IP config (ipconfig, APIPA?) → ping loopback → ping gateway → ping external IP → ping name (DNS).</k>`,
  map: ['HW & network troubleshooting', '', [
    ['Power/board', '', [['no power', 'outlet, PSU'], ['beeps', 'POST code'], ['reboots', 'heat, PSU, RAM'], ['clock resets', 'CMOS'], ['swollen caps', 'replace board']]],
    ['Storage', '', [['clicking', 'back up now'], ['no boot device', 'boot order, cable'], ['RAID degraded', 'replace, rebuild'], ['S.M.A.R.T.', 'predict failure']]],
    ['Display', '', [['no image', 'input/cable'], ['dim', 'backlight'], ['artifacts', 'GPU heat/driver'], ['burn-in', 'OLED']]],
    ['Network', '', [['APIPA', 'DHCP'], ['IP ok, names fail', 'DNS'], ['local ok, internet fails', 'gateway'], ['conflict', 'static in scope'], ['jitter', 'QoS']]]
  ]],
  cards: `Fans spin but no POST | Check RAM seating, CPU, motherboard, PSU. Listen for beep codes
Clicking HDD | Imminent failure. Back up immediately
S.M.A.R.T. | Drive self-monitoring that predicts failure
Bootable device not found | Check boot order, drive connection, drive health
Swollen capacitors | Replace the motherboard
Display artifacts | Overheating/failing GPU or bad driver
Projector shuts off after a while | Overheating: clean filter/vents, check fan
Can ping IP but not hostname | DNS problem
Can reach LAN but not internet | Default gateway / router / ISP
IP address conflict | Duplicate static IP. Use DHCP reservations/exclusions
Jitter | Variation in latency. Hurts VoIP/video. Use QoS
Port flapping | Interface repeatedly going up/down: cable or NIC
Burn-in | Permanent ghost image on OLED/plasma from static content
Network test order | Link → ipconfig → ping 127.0.0.1 → gateway → external IP → name`,
  ex: [
    ['m', 'A PC powers on, fans spin, but there is no display and it emits a repeating beep pattern. FIRST step?', ['Look up the beep code and reseat the RAM', 'Replace the monitor', 'Reinstall Windows', 'Replace the PSU'], 'Beep codes identify the POST failure. RAM is the most common.'],
    ['m', 'A user hears clicking from their desktop and files open slowly. What should the technician do FIRST?', ['Back up the user\'s data', 'Defragment the drive', 'Replace the SATA cable', 'Run a virus scan'], 'Clicking = failing HDD. Protect the data first.'],
    ['m', 'After a power outage, a PC shows "No bootable device". The drive is detected in UEFI. NEXT step?', ['Check the boot order', 'Replace the drive', 'Replace the motherboard', 'Reset the CMOS battery'], 'Settings may have reset. Make sure the right drive is first.'],
    ['m', 'Users can ping 8.8.8.8 but cannot open www.example.com. MOST likely cause?', ['DNS server issue', 'Default gateway down', 'Bad Ethernet cable', 'DHCP scope exhausted'], 'IP works, names fail = DNS.'],
    ['m', 'A PC can reach other PCs on the LAN but not the internet. Which setting should be checked?', ['Default gateway', 'Subnet mask on the printer', 'DNS suffix', 'MAC address'], 'Off-network traffic goes through the gateway.'],
    ['m', 'Two PCs show "IP address conflict" warnings. One uses a static IP. Best long-term fix?', ['Exclude that address from the DHCP scope or use a reservation', 'Restart both PCs daily', 'Shorten the lease time', 'Disable DHCP'], 'Static IPs inside the dynamic range cause conflicts.'],
    ['m', 'A desktop randomly reboots. The CPU fan is clogged with dust. What should the technician do?', ['Clean the dust and verify fan operation and temperatures', 'Replace the PSU', 'Reinstall the OS', 'Add more RAM'], 'Overheating causes shutdowns. Clean and verify.'],
    ['m', 'A projector turns itself off after 20 minutes of use. MOST likely cause?', ['Overheating from a clogged filter or failed fan', 'Wrong input source', 'Bad VGA cable', 'Low resolution'], 'Projectors have thermal protection.'],
    ['m', 'VoIP calls break up and sound robotic, but web browsing seems fine. Which issue is MOST likely?', ['Jitter', 'APIPA', 'DNS failure', 'IP conflict'], 'Jitter (latency variation) hurts real-time traffic. Use QoS.'],
    ['m', 'Graphical artifacts appear in games, then the PC crashes. The GPU is very hot. MOST likely cause?', ['Overheating GPU', 'Bad network driver', 'Corrupt user profile', 'Low disk space'], 'Artifacts + heat = GPU cooling or failure.'],
    ['mm', 'A server\'s RAID 5 array shows "degraded" and one drive has an amber LED. Which TWO actions are correct? (Choose two.)', ['Replace the failed drive with a compatible one', 'Allow the array to rebuild and monitor it', 'Delete the array and recreate it', 'Remove a second drive to test', 'Convert to RAID 0'], 'Swap the failed disk (hot-swap if supported), then let it rebuild.'],
    ['m', 'A capacitor on the motherboard is bulging and leaking. What should the technician do?', ['Replace the motherboard', 'Update the BIOS', 'Reseat the RAM', 'Replace the CMOS battery'], 'Failed capacitors mean board replacement.'],
    ['s', 'Order the steps to isolate a "no internet" problem on one PC.', ['Check the link light and cable', 'Run ipconfig to check the IP configuration', 'Ping 127.0.0.1', 'Ping the default gateway', 'Ping an external IP address', 'Ping a hostname to test DNS'], 'Bottom-up: physical, IP config, local stack, gateway, internet, DNS.'],
    ['f', 'The drive self-monitoring feature that predicts failure is ___.', ['SMART', 'S.M.A.R.T.', 's.m.a.r.t'], 'Self-Monitoring, Analysis and Reporting Technology.'],
    ['x', 'Match the symptom to the likely cause.', [['Clock resets after unplugging', 'CMOS battery'], ['169.254 address', 'DHCP unreachable'], ['Names fail, IPs work', 'DNS'], ['Dim screen visible with flashlight', 'Backlight'], ['Repeated grinding from drive', 'Failing HDD']], 'Common Core 1 troubleshooting pairs.'],
    ['t', 'An OLED display showing a faint permanent taskbar image has burn-in.', true, 'Static images can permanently mark OLED panels.'],
    ['m', 'A phone will not charge with any cable. The port looks dirty. FIRST step?', ['Carefully clean debris from the charging port', 'Replace the battery', 'Factory reset the phone', 'Replace the screen'], 'Lint in the port is the most common cause.'],
    ['m', 'Wireless users in one meeting room lose connection whenever the break-room microwave runs. Fix?', ['Move clients to 5 GHz or change channels / AP placement', 'Replace the users\' laptops', 'Disable DHCP', 'Use a longer Ethernet cable'], 'Microwaves interfere with 2.4 GHz.']
  ]
},
{
  day: 14, exam: 1, dom: '5.0', title: 'Core 1 review and full mock exam', obj: '220-1201 · all domains · cram sheet + 90-question mock', deck: 'd14', mock: 'c1',
  goals: ['Close your weakest Core 1 domain', 'Take the full timed Core 1 mock', 'Decide whether to book 220-1201 now'],
  concept: `
<h3>Today's plan</h3>
<ol>
<li>Open <b>Me</b> → Core 1 by domain. Do one domain quiz (Practice → By domain) for your lowest domain.</li>
<li>Review the cram sheet below out loud.</li>
<li>Take the <b>Core 1 full mock</b>: 90 questions, 90 minutes, no notes.</li>
<li>Work the gap report. Retry misses. Then re-read those lessons.</li>
</ol>
<h3>Core 1 cram sheet</h3>
<tb>Topic;Must-know facts
Troubleshooting;Identify → Theory → Test → Plan → Implement → Verify → Document. Back up in step 1
Ports;20/21 FTP · 22 SSH · 23 Telnet · 25 SMTP · 53 DNS · 67/68 DHCP · 69 TFTP · 80 HTTP · 110 POP3 · 137–139 NetBIOS · 143 IMAP · 161/162 SNMP · 389 LDAP · 443 HTTPS · 445 SMB · 3389 RDP
TCP vs UDP;DHCP, TFTP, SNMP = UDP. DNS = both
IP;APIPA 169.254 · loopback 127.0.0.1 / ::1 · private 10/8, 172.16–31, 192.168/16 · fe80 link-local
DNS;A, AAAA, CNAME, MX, TXT (SPF, DKIM, DMARC)
Wi-Fi;n = 4 (2.4/5) · ac = 5 (5 only) · ax = 6/6E (+6 GHz) · be = 7 · 2.4 GHz channels 1/6/11
PoE;af 15.4 W · at 30 W · bt 60–100 W
Cables;Cat 5e 1G · Cat 6a 10G · 100 m · plenum · T568B
USB;2.0 480 Mb/s · 3.2 Gen1 5 · Gen2 10 · TB 40
RAID;0 stripe · 1 mirror · 5 parity (3+) · 6 double (4+) · 10 (4+)
RAM;DIMM / SO-DIMM · DDR4 ≠ DDR5 · ECC · dual channel pairs
Firmware;UEFI, Secure Boot, TPM 2.0, CMOS battery = clock resets
Laser;Processing, Charging, Exposing, Developing, Transferring, Fusing, Cleaning
Printers;smear = fuser · ghost = drum · garbage = driver · stuck queue = spooler
Mobile;Wi-Fi antenna in bezel · MDM/MAM · IMAPS 993 · POP3S 995 · SMTP 587
Cloud;IaaS / PaaS / SaaS · public, private, hybrid, community · elasticity, metered
Hypervisor;Type 1 bare metal · Type 2 hosted · containers share kernel
Tools;toner probe trace · punchdown patch panel · loopback port test · Wi-Fi analyzer</tb>
<k>Booking rule used in this plan: two Core 1 mocks at 750+ on different days, every domain 75%+, then book 220-1201.</k>`,
  map: ['Core 1 at a glance', '220-1201', [
    ['1.0 Mobile 13%', '', [['laptop parts', ''], ['display + antenna', ''], ['MDM, sync, email', '']]],
    ['2.0 Networking 23%', '', [['ports', ''], ['devices, Wi-Fi', ''], ['IP, DHCP, DNS', ''], ['cables, tools', '']]],
    ['3.0 Hardware 25%', '', [['board, CPU, firmware', ''], ['RAM, storage, RAID', ''], ['PSU, builds', ''], ['cables, displays', ''], ['printers', '']]],
    ['4.0 Virt & Cloud 11%', '', [['hypervisors', ''], ['IaaS/PaaS/SaaS', '']]],
    ['5.0 Troubleshooting 28%', '', [['method', ''], ['HW, storage, video', ''], ['mobile, printer', ''], ['network', '']]]
  ]],
  cards: `Highest-weighted Core 1 domain | 5.0 Hardware & Network Troubleshooting (28%)
Core 1 pass mark | 675 / 900
Ports to know cold | 20/21, 22, 23, 25, 53, 67/68, 69, 80, 110, 137-139, 143, 161/162, 389, 443, 445, 3389
UDP protocols to know | DHCP, TFTP, SNMP (DNS uses both)
Smear / ghost / garbage / stuck queue | Fuser / drum / driver / spooler
Wi-Fi 4 / 5 / 6 / 7 | 802.11n / ac / ax / be`,
  ex: [
    ['m', 'Which port must be allowed through a firewall for secure web traffic?', ['443', '80', '8443 only', '22'], 'HTTPS = 443.'],
    ['m', 'A technician replaced a failed NIC and confirmed the user can browse. What is the NEXT step?', ['Document the findings, actions and outcomes', 'Establish a theory', 'Escalate', 'Test the theory'], 'After verify comes document.'],
    ['m', 'Which RAID level gives fault tolerance for two simultaneous drive failures?', ['RAID 6', 'RAID 5', 'RAID 1', 'RAID 0'], 'Double parity.'],
    ['m', 'Printed text smudges when touched. Which laser printer part is MOST likely at fault?', ['Fuser', 'Drum', 'Transfer roller', 'Laser'], 'Fusing step.'],
    ['m', 'Which Wi-Fi standard is Wi-Fi 6?', ['802.11ax', '802.11ac', '802.11n', '802.11be'], 'ax = 6.'],
    ['m', 'A PC has the address 169.254.0.15. What failed?', ['DHCP', 'DNS', 'NAT', 'Gateway'], 'APIPA.'],
    ['m', 'Which cloud model gives a customer full control of the operating system on rented virtual servers?', ['IaaS', 'SaaS', 'PaaS', 'Community'], 'IaaS.'],
    ['m', 'A laptop has poor Wi-Fi after its display was replaced. Check the:', ['Antenna connections', 'RAM', 'Battery', 'Keyboard ribbon'], 'Antennas run in the bezel.'],
    ['mm', 'Which TWO are UDP-based protocols? (Choose two.)', ['TFTP', 'SNMP', 'SSH', 'SMTP', 'RDP over TCP'], 'TFTP 69 and SNMP 161 are UDP.'],
    ['m', 'Which tool identifies which cable in a bundle connects to a wall jack?', ['Toner probe', 'Loopback plug', 'Crimper', 'PSU tester'], 'Tone generator and probe.'],
    ['m', 'Date and time reset every time a PC loses power. Replace the:', ['CMOS battery', 'PSU', 'RTC driver', 'SSD'], 'CR2032.'],
    ['f', 'RDP uses port ___.', ['3389'], 'Remote Desktop Protocol.'],
    ['f', 'Windows file sharing (SMB) uses TCP port ___.', ['445'], 'SMB = 445.'],
    ['x', 'Match each issue to the FIRST thing to check.', [['No display, PC running', 'Monitor input source and cable'], ['Names fail, IPs work', 'DNS settings'], ['Print jobs stuck for all', 'Print spooler'], ['PC dead, no fans', 'Power outlet and cable'], ['VM will not start, no VT', 'Virtualization in UEFI']], 'First-step thinking.'],
    ['t', 'A Type 2 hypervisor runs on top of a host operating system.', true, 'Hosted hypervisor.'],
    ['m', 'Which DNS record helps receivers verify an email was signed by the sending domain?', ['DKIM', 'MX', 'AAAA', 'CNAME'], 'DKIM publishes the public key in a TXT record.']
  ]
}
);
