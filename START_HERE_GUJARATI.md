# Venture Adventure — નવું login અને પોતાની hosting

આ નવું version ChatGPT login વગર ચાલે છે. હજી બહારની hosting પર live કરેલું નથી.

## Login કેવી રીતે ચાલશે?

1. Staff/B2B user પોતાનું Gmail email અને આ website માટેનો નવો password આપીને signup કરશે.
2. Account Pending રહેશે; તરત booking નહીં કરી શકે.
3. તમે admin login કરીને Settings → Signup approvalsમાં user જોશો.
4. Staff માટે Branch અને B2B માટે Company પસંદ કરીને Approve કરશો.
5. પછી user booking કરી શકશે. Payment, passenger list અને accounts ફક્ત adminને દેખાશે.
6. Disable કરવાથી userની existing sessions પણ બંધ થશે.

આ Googleનું “Continue with Google” OAuth નથી. Gmail address વેબસાઇટના account ID તરીકે વપરાય છે. Gmailનો પોતાનો password ક્યારેય અહીં આપવાનો નથી.

## Live કરવા હવે શું જોઈએ?

- તમારા Render accountનું connection અથવા તમારા Google Cloud/VPS hostingની access.
- Website માટેની external URL/domain.
- Server પર admin account બનાવતી વખતે તમે નક્કી કરેલો password. કોઈ default admin password રાખેલો નથી.
- જૂના live હિસાબનું export અને migration, જો તમે અગાઉ entries કરી હોય.

Code સાથે Render setup, Docker setup અને વિગતવાર README.md છે. Source ZIPમાં customer records, passwords કે live database સામેલ નથી. જૂની website અને જૂનો data આ કામથી બદલાયા નથી.

## નવી tour અને 45-seat bus

- Admin → Bus bookings → Add departure / tour: નવી tour, date, rates અને bus ઉમેરો.
- એક જ tour/dateમાં બીજી bus માટે Add another bus દબાવો.
- Edit date / bus / rates → Bus capacity: 45 પસંદ કરો અને કઈ 4-seat row કાઢવી તે પસંદ કરો.
- Numbering મૂળ જેવી રાખી શકો, અથવા booking ન થયેલી bus માટે 1–45 કરી શકો.
- એ rowમાં booking હોય તો admin manifestમાંથી પહેલાં passengerને બીજી ખાલી seat પર move કરો.
- Staff/B2Bને માત્ર Tour → Date → Bus → Seat layout → Booking form દેખાશે.
