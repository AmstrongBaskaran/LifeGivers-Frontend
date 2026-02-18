# donate.js - Absolute 100% Every Single Line & Word-by-Word Explanation (Thanglish)

Indha document-la `donate.js`-oda **ovvoru variyaiyum (Line 1 to 204)** oru vari kuda vidama, andha vari-la irukka **ovvoru vaarthaiyaiyum (Word-by-Word)** clear-ah explain panni irukkaen.

---

## Line-by-Line Breakdown

**Line 1:** `document.addEventListener('DOMContentLoaded', async () => {`
- **document**: Namma HTML page-a JavaScript-la access panna use aagura main object.
- **addEventListener**: Oru activity (event)-a kavanikka (listen panna) namma vaikira oru tool.
- **'DOMContentLoaded'**: Browser HTML tags-a full-ah read panni mudichuttu calculations-ku ready aana udane idhu trigger aagum.
- **async**: Idhu asynchronous function. Backend-la irundhu data vaanga neramaagum, adhuvara code block aagidama wait panna use aagum.
- **() => {**: Idhu oru arrow function. Page ready aana udane idhukulla irukka code-a run pannu nu artham.

**Line 2:** `    let selectedAmount = null;`
- **let**: Matha koodiya (Changeable) variable create panna usage.
- **selectedAmount**: User select panna donation amount-a store panna variable.
- **null**: Initial-ah empty value (Onnum select pannala nu artham).

**Line 3:** `    let selectedMethod = null;`
- **selectedMethod**: User select panna payment method (UPI, Card, etc.) store panna variable.
- **null**: Aarambathula onnum select pannala nu default value.

**Line 4:** `    const customAmountInput = document.getElementById('custom-amount');`
- **const**: Matha mudiyatha variable create panna.
- **customAmountInput**: User custom amount type panna input box-a select pannuthu.
- **getElementById('custom-amount')**: HTML-la 'custom-amount' ID-a vachu antha input field-a JavaScript-kulla kondu varuthu.

**Line 5:** `    const amtButtons = document.querySelectorAll('.amt-btn');`
- **querySelectorAll**: HTML-la irukka ella '.amt-btn' class buttons-ayum (₹100, ₹500, ₹1000, etc.) oru list-ah edukkuthu.

**Line 6:** `    const payButtons = document.querySelectorAll('.pay-btn');`
- **payButtons**: Payment method buttons (UPI, Card, Net Banking) ella buttons-ayum list-ah select pannuthu.

**Line 7:** `    const donateBtn = document.getElementById('donate-now-btn');`
- **donateBtn**: Final "Donate Now" button-a select pannuthu.

**Line 9:** `    // --- Dynamic Content Loading ---`
- Explanation: Idhu oru single-line comment. Code-a organize panna help pannum.

**Line 10:** `    const urlParams = new URLSearchParams(window.location.search);`
- **URLSearchParams**: Browser address bar-la irukka URL-la "?id=123" madhiri parameters-a read panna tool.
- **window.location.search**: Current page-oda URL-la irukka query string (? apram vara part) edukkuthu.

**Line 11:** `    let fundraiserId = urlParams.get('id');`
- **get('id')**: URL-la "?id=5" nu irundha, antha "5" value-a edukkuthu.
- **fundraiserId**: Endha campaign-ku donate pannanum nu identify panna ID store panrom.

**Line 13:** `    async function loadCampaign(id) {`
- **async function**: Backend-la irundhu data fetch panna wait panna koodiya function.
- **loadCampaign**: Function peyar - Specific campaign details load panna.
- **id**: Parameter - Endha campaign-oda details venumnu ID pass panrom.

**Line 14:** `        try {`
- **try**: Indha block-kulla irukka code-a execute pannu, error vandha catch-ku po.

**Line 15:** `            const response = await fetch(`https://life-givers-backend.vercel.app/fundraiser/${id}`);`
- **await**: Backend pathil anuppa varaikkum wait pannu.
- **fetch**: Backend API-ku network request anuppa tool.
- **`https://life-givers-backend.vercel.app/fundraiser/${id}`**: Backend server address. `${id}` nu sonna dynamic-ah ID insert aagum (Ex: /fundraiser/5).

**Line 16:** `            if (response.ok) {`
- **response.ok**: Server pathil success-ah vandha (Status 200) check pannuthu.

**Line 17:** `                const data = await response.json();`
- **await response.json()**: Server anuppa JSON data-va JavaScript object-ah convert pannuthu.

**Line 18:** `                fillCampaignDetails(data);`
- **fillCampaignDetails**: Oru function call. Vandha data-va screen-la display panna anuppurom.

**Line 19:** `            }`
- Explanation: If condition closing.

**Line 20:** `        } catch (error) {`
- **catch**: Network error or server down aana idhu handle pannum.

**Line 21:** `            console.error('Error fetching fundraiser details:', error);`
- **console.error**: Browser console-la error message print pannum (Developer tools-la theriyum).

**Line 22:** `        }`
- Explanation: Try/Catch closing.

**Line 23:** `    }`
- Explanation: loadCampaign function closing.

**Line 25:** `    function fillCampaignDetails(data) {`
- **fillCampaignDetails**: Backend-la irundhu vandha campaign data-va screen elements-la fill panna function.

**Line 26:** `        const titleEl = document.getElementById('campaign-title');`
- **titleEl**: Campaign title display panna HTML element-a select pannuthu.

**Line 27:** `        const locEl = document.getElementById('campaign-location');`
- **locEl**: Campaign location display panna element.

**Line 28:** `        const priceEl = document.getElementById('campaign-target');`
- **priceEl**: Target amount display panna element.

**Line 29:** `        const imgEl = document.getElementById('campaign-image');`
- **imgEl**: Campaign image display panna `<img>` tag select pannuthu.

**Line 30:** `        const storyEl = document.getElementById('campaign-story');`
- **storyEl**: Campaign story text display panna element.

**Line 32:** `        if (titleEl) titleEl.textContent = data.campaign_title;`
- **if (titleEl)**: Element exist pannutha nu check pannuthu (Safety check).
- **textContent**: Element-oda text content-a backend data-la irukka campaign title-ah mathuthu.

**Line 33:** ` if (locEl) locEl.textContent = data.location;`
- Explanation: Location text-a backend data-la irundhu set pannuthu.

**Line 34:** `  if (priceEl) priceEl.textContent = 'Goal Amount: ₹' + data.target_amount.toLocaleString('en-IN');`
- **toLocaleString('en-IN')**: Number-a Indian format-la (1,00,000) comma separation-oda display pannuthu.
- **'Goal Amount: ₹' +**: Text prefix add pannuthu.

**Line 35:** `        if (imgEl) imgEl.src = data.campaign_image_url || '../assets/herosec_img1.avif';`
- **imgEl.src**: Image-oda source URL-a set pannuthu.
- **||**: OR operator. Backend-la image URL illai-na default image use pannu.

**Line 36:** `        if (storyEl) storyEl.textContent = data.story_text;`
- Explanation: Campaign story text-a fill pannuthu.

**Line 38:** `        // Update global fundraiserId in case it was auto-picked`
- Explanation: Comment - Auto-pick mode-la ID update pannurom nu explain pannuthu.

**Line 39:** `        window.currentFundraiserId = data.fundraiser_id;`
- **window.currentFundraiserId**: Global variable create pannuthu. Page-oda enga irundhalum access panna mudiyum.
- **data.fundraiser_id**: Backend-la irundhu vandha actual fundraiser ID-a store pannuthu.

**Line 40:** `    }`
- Explanation: fillCampaignDetails function closing.

**Line 42:** `    if (fundraiserId) {`
- **if**: URL-la fundraiser ID irukka nu check pannuthu.

**Line 43:** `        loadCampaign(fundraiserId);`
- Explanation: ID irundha antha specific campaign details load pannu.

**Line 44:** `    } else {`
- **else**: URL-la ID illai-na (User header-la "Donate" button click pannirukalam).

**Line 45:** `        // --- AUTO-PICK MODE ---`
- Explanation: Comment - Automatic-ah first campaign select panna mode.

**Line 46:** `        // If no ID is in URL (e.g. from Index header "Donate"), pick the first approved one`
- Explanation: Detailed comment - Eppadi auto-pick work aagum nu explain pannuthu.

**Line 47:** `        try {`
- **try**: Error handling block start.

**Line 48:** `            const response = await fetch('https://life-givers-backend.vercel.app/fundraiser/status/approved');`
- **await fetch**: Backend-la irundhu approved status-la irukka ella campaigns-ayum request pannuthu.

**Line 49:** ` if (response.ok) {`
- Explanation: Success response check.

**Line 50:** `const approvedList = await response.json();`
- **approvedList**: Approved campaigns-oda list-a JSON-ah convert panni store pannuthu.

**Line 51:** `if (approvedList.length > 0) {`
- **length > 0**: List-la minimum oru campaign irukka nu check pannuthu.

**Line 52:** `                    fillCampaignDetails(approvedList[0]);`
- **approvedList[0]**: List-la first campaign (Index 0) details-a edukkuthu.
- **fillCampaignDetails**: Antha details-a screen-la display pannuthu.

**Line 53:** `                } else {`
- **else**: Approved campaigns onnum illai-na.

**Line 54:** `                    const titleEl = document.getElementById('campaign-title');`
- Explanation: Title element select pannuthu.

**Line 55:** `                    if (titleEl) titleEl.textContent = 'No active campaigns found.';`
- Explanation: User-ku "Active campaigns illa" nu message display pannuthu.

**Line 56:** `                }`
- Explanation: Inner if/else closing.

**Line 57:** `            }`
- Explanation: Response OK check closing.

**Line 58:** `        } catch (error) {`
- **catch**: Network error handle panna.

**Line 59:** `            console.error('Error fetching approved list:', error);`
- Explanation: Console-la error log pannuthu.

**Line 60:** `        }`
- Explanation: Try/Catch closing.

**Line 61:** `    }`
- Explanation: Main if/else (fundraiserId check) closing.

**Line 63:** `    amtButtons.forEach(btn => {`
- **forEach**: Ella amount buttons-kum (₹100, ₹500, etc.) loop run pannuthu.
- **btn**: Current button variable.

**Line 64:** `        btn.addEventListener('click', () => {`
- **click**: User button click pannuna trigger aagum.

**Line 65:** `            amtButtons.forEach(b => b.classList.remove('selected'));`
- **classList.remove('selected')**: Munnadiye select panna buttons-la irundhu highlight color remove pannuthu.

**Line 66:** `            btn.classList.add('selected');`
- **classList.add('selected')**: Ippo click panna button-ku mattum highlight color add pannuthu.

**Line 67:** `            selectedAmount = btn.dataset.amount;`
- **dataset.amount**: Button-la HTML-la `data-amount="500"` nu store panna value-a edukkuthu.

**Line 68:** `            customAmountInput.value = '';`
- **value = ''**: Custom input box-a clear pannuthu (User button select pannitan, so custom input vendam).

**Line 69:** `            ValidationUtils.clearError('custom-amount');`
- **ValidationUtils.clearError**: Munnadiye irundha error messages-a clear pannuthu.

**Line 70:** `        });`
- Explanation: Click listener closing.

**Line 71:** `    });`
- Explanation: forEach closing.

**Line 73:** `    customAmountInput.addEventListener('input', () => {`
- **input**: User custom amount type panna (Typing nadakkum pothu) trigger aagum.

**Line 74:** `        amtButtons.forEach(b => b.classList.remove('selected'));`
- Explanation: User custom amount type pannitan, so preset buttons-la irundhu selection remove pannuthu.

**Line 75:** `        selectedAmount = customAmountInput.value;`
- Explanation: User type panna value-a selectedAmount variable-la store pannuthu.

**Line 76:** `        if (selectedAmount) {`
- Explanation: Value irukka nu check pannuthu.

**Line 77:** `            ValidationUtils.clearError('custom-amount');`
- Explanation: Error messages clear pannuthu.

**Line 78:** `        }`
- Explanation: If closing.

**Line 79:** `    });`
- Explanation: Input listener closing.

**Line 81:** `    payButtons.forEach(btn => {`
- **forEach**: Ella payment method buttons-kum loop run pannuthu.

**Line 82:** `        btn.addEventListener('click', () => {`
- Explanation: Payment button click event.

**Line 83:** `            payButtons.forEach(b => b.classList.remove('selected'));`
- Explanation: Munnadiye select panna payment methods-la irundhu highlight remove pannuthu.

**Line 84:** `            btn.classList.add('selected');`
- Explanation: Ippo click panna payment method-ku highlight add pannuthu.

**Line 85:** `            selectedMethod = btn.dataset.method;`
- **dataset.method**: Button-la `data-method="UPI"` nu store panna value-a edukkuthu.

**Line 86:** `            ValidationUtils.clearError('payment-method');`
- Explanation: Payment method error messages clear pannuthu.

**Line 87:** `        });`
- Explanation: Click listener closing.

**Line 88:** `    });`
- Explanation: forEach closing.

**Line 90:** `    donateBtn.addEventListener('click', () => {`
- **click**: "Donate Now" button click pannuna trigger aagum.

**Line 91:** `        const amount = customAmountInput.value || selectedAmount;`
- **||**: OR operator. Custom input-la value irundha adha use pannu, illai-na button-la select panna amount use pannu.

**Line 93:** `        let isValid = true;`
- **isValid**: Validation pass aaguma nu track panna flag variable. Default-ah true.

**Line 94:** `        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {`
- **!amount**: Amount empty-ah irukka check.
- **isNaN(amount)**: Amount number illa-na (Text type pannirukalam) check.
- **parseFloat(amount) <= 0**: Amount zero or negative-ah irukka check.

**Line 95:** `            ValidationUtils.showError('custom-amount', 'Please select or enter a valid amount');`
- **showError**: User-ku error message display pannuthu.

**Line 96:** `            isValid = false;`
- Explanation: Validation fail aagiduchi nu mark pannuthu.

**Line 97:** `        } else {`
- **else**: Amount valid-ah irundha.

**Line 98:** `            ValidationUtils.clearError('custom-amount');`
- Explanation: Error messages clear pannuthu.

**Line 99:** `        }`
- Explanation: Amount validation if/else closing.

**Line 101:** `        if (!selectedMethod) {`
- **!selectedMethod**: Payment method select pannalaya nu check.

**Line 102:** `            const errorSpan = document.getElementById('payment-method-error');`
- **errorSpan**: Error message display panna element select pannuthu.

**Line 103:** `            errorSpan.textContent = 'Please select a payment method';`
- Explanation: Error text set pannuthu.

**Line 104:** `            errorSpan.style.color = '#dc2626';`
- **style.color**: Error text-a red color-ah mathuthu.

**Line 105:** `            errorSpan.style.display = 'block';`
- **display = 'block'**: Hidden element-a visible-ah mathuthu.

**Line 106:** `            isValid = false;`
- Explanation: Validation fail mark.

**Line 107:** `        }`
- Explanation: Payment method validation closing.

**Line 109:** `        if (isValid) {`
- Explanation: Ella validations-um pass aana dhaan proceed pannum.

**Line 110:** `            openQRBox(amount, selectedMethod, window.currentFundraiserId || fundraiserId);`
- **openQRBox**: QR code popup box open panna function call.
- **window.currentFundraiserId || fundraiserId**: Global variable-la ID irundha adha use pannu, illai-na URL-la irundha ID use pannu.

**Line 111:** `        }`
- Explanation: isValid check closing.

**Line 112:** `    });`
- Explanation: Donate button click listener closing.

**Line 114:** `    function openQRBox(amount, method, fundraiserId) {`
- **openQRBox**: QR code modal popup create panna function.
- **amount, method, fundraiserId**: Parameters - Donation details.

**Line 115:** `        // Create a dynamic QR Code modal`
- Explanation: Comment - Dynamic popup create pannurom nu explain.

**Line 116:** `        const box = document.createElement('div');`
- **createElement('div')**: Memory-la oru pudhu `<div>` element create pannuthu.

**Line 117:** `        box.id = 'qr-box';`
- **id**: Antha div-ku 'qr-box' nu ID set pannuthu (CSS styling-ku use aagum).

**Line 118:** `        box.innerHTML = ``
- **innerHTML**: Div-kulla HTML content insert panna start pannuthu.
- **``**: Template literal - Multi-line HTML ezhudha use aagum.

**Line 119-131:** (HTML Template Content)
- Explanation: QR code popup-oda full HTML structure. Includes:
  - **Line 120**: `<h3>Scan QR Code</h3>` - Title
  - **Line 121**: QR code image (API-la irundhu generate aaguthu)
  - **Line 122**: Amount display with Indian formatting
  - **Line 124-127**: Optional donor name input field
  - **Line 129**: Submit button

**Line 132:** `        document.body.appendChild(box);`
- **appendChild**: Create panna popup box-a page-oda body-la add pannuthu (Screen-la visible aagum).

**Line 134:** `        // Submit button click`
- Explanation: Comment - Submit button logic.

**Line 135:** `        document.getElementById('submit-donate').onclick = async () => {`
- **onclick**: Popup-la irukka submit button click event.
- **async**: Backend-ku data anuppa wait panna koodiya function.

**Line 136:** `            const donorName = document.getElementById('donor-name-input').value.trim();`
- **value**: Input field-la type panna name-a edukkuthu.
- **trim()**: Extra spaces remove pannuthu (Front/back-la irukka spaces).

**Line 137:** `            await saveDonation(amount, method, fundraiserId, box, donorName);`
- **await saveDonation**: Donation save panna function call. Complete aagura varaikkum wait pannum.

**Line 138:** `        };`
- Explanation: Submit onclick closing.

**Line 140:** `        // Click outside to close`
- Explanation: Comment - Popup veliya click pannuna close aagum.

**Line 141:** `        box.onclick = (e) => {`
- **box.onclick**: Popup box-la enga venalum click pannuna trigger aagum.
- **e**: Event object - Click details store pannuthu.

**Line 142:** `            if (e.target === box) {`
- **e.target === box**: User popup-oda background (grey area) click pannara, content area-va click pannala nu check.

**Line 143:** `                box.remove();`
- **remove()**: Popup-a page-la irundhu delete pannuthu (Close aagum).

**Line 144:** `            }`
- Explanation: Click target check closing.

**Line 145:** `        };`
- Explanation: Box onclick closing.

**Line 146:** `    }`
- Explanation: openQRBox function closing.

**Line 148:** `    async function saveDonation(amount, method, fundraiserId, box, donorName) {`
- **async function saveDonation**: Donation data-va backend database-la save panna function.
- **Parameters**: amount, method, fundraiserId, box (popup reference), donorName.

**Line 149:** `        const submitBtn = document.getElementById('submit-donate');`
- **submitBtn**: Submit button element select pannuthu.

**Line 150:** `        submitBtn.disabled = true;`
- **disabled = true**: Double click prevent panna button-a lock pannuthu.

**Line 151:** `        submitBtn.textContent = 'Submitting...';`
- Explanation: Button text-a "Submitting..." nu mathuthu (Loading feedback).

**Line 153:** `        try {`
- **try**: Backend call attempt. Error vandha catch-ku pogum.

**Line 154:** `            // Get user ID if logged in`
- Explanation: Comment - User login pannirundha ID edukkurom.

**Line 155:** `            let userId = localStorage.getItem('user_id');`
- **localStorage.getItem**: Browser memory-la store panna user ID-a edukkuthu.

**Line 158:** `            // Donation data`
- Explanation: Comment - Donation packet prepare pannurom.

**Line 159:** `            const donationData = {`
- **donationData**: Backend-ku anuppa pora data packet (Object).

**Line 160:** `                user_id: userId,`
- Explanation: User ID add pannuthu (Login pannala-na null aagum).

**Line 161:** `                fundraiser_id: fundraiserId ? parseInt(fundraiserId) : null,`
- **parseInt**: ID-a string-la irundha number-ah convert pannuthu.
- **? :**: Ternary operator. ID irundha convert pannu, illai-na null vidu.

**Line 162:** `                donor_name: donorName || 'Anonymous',`
- **||**: Name type pannala-na 'Anonymous' nu default value set pannuthu.

**Line 163:** `                amount: parseFloat(amount),`
- **parseFloat**: Amount-a decimal number format-ku convert pannuthu.

**Line 164:** `                payment_method: method`
- Explanation: Payment method add pannuthu.

**Line 165:** `            };`
- Explanation: donationData object closing.

**Line 167:** `            // Save to database`
- Explanation: Comment - Database save operation.

**Line 168:** `            // Save Donation record to Backend Database`
- Explanation: Additional comment for clarity.

**Line 169:** `            const response = await fetch('https://life-givers-backend.vercel.app/donations/', {`
- **await fetch**: Backend donations endpoint-ku POST request anuppurom. Response vara varaikkum wait.

**Line 170:** `                method: 'POST',`
- **POST**: Data create/insert panna HTTP method.

**Line 171:** `                headers: {`
- **headers**: Request-oda metadata (Backend-ku enna type data nu solrom).

**Line 172:** `                    'Content-Type': 'application/json',`
- Explanation: "Namma anuppuradhu JSON format data" nu backend-ku inform pannuthu.

**Line 173:** `                },`
- Explanation: Headers object closing.

**Line 174:** `                body: JSON.stringify(donationData)`
- **JSON.stringify**: JavaScript object-a JSON string-ah convert pannuthu (Network-la anuppa format).

**Line 175:** `            });`
- Explanation: Fetch options closing.

**Line 177:** `            if (response.ok) {`
- **response.ok**: Backend success response (Status 200-299) anuppicha check.

**Line 178:** `                const result = await response.json();`
- **result**: Backend-la irundhu vandha response data-va JSON-ah parse pannuthu.

**Line 180:** `                // Close box`
- Explanation: Comment - Popup close pannurom.

**Line 181:** `                box.remove();`
- Explanation: QR popup-a page-la irundhu remove pannuthu.

**Line 183:** `                // Show success`
- Explanation: Comment - Success message.

**Line 184:** `                alert('Donated Successfully!');`
- **alert**: Browser popup-la success message display pannuthu.

**Line 186:** `                // Reset form`
- Explanation: Comment - Form-a initial state-ku reset pannurom.

**Line 187:** `                customAmountInput.value = '';`
- Explanation: Custom amount input-a clear pannuthu.

**Line 188:** `                amtButtons.forEach(b => b.classList.remove('selected'));`
- Explanation: Ella amount buttons-la irundhu selection remove pannuthu.

**Line 189:** `                payButtons.forEach(b => b.classList.remove('selected'));`
- Explanation: Payment method buttons-la irundhu selection remove pannuthu.

**Line 190:** `                selectedAmount = null;`
- Explanation: Selected amount variable-a reset pannuthu.

**Line 191:** `                selectedMethod = null;`
- Explanation: Selected payment method variable-a reset pannuthu.

**Line 192:** `            } else {`
- **else**: Backend error response vandha (Status 400+).

**Line 193:** `                alert('Failed to donate. Please try again.');`
- Explanation: User-ku failure message display pannuthu.

**Line 194:** `            }`
- Explanation: Response OK check closing.

**Line 195:** `        } catch (error) {`
- **catch**: Network error, server down, or any exception handle panna.

**Line 196:** `            console.error('Error:', error);`
- Explanation: Console-la error details log pannuthu.

**Line 197:** `            alert('Error occurred. Please check backend server.');`
- Explanation: User-ku generic error message display pannuthu.

**Line 198:** `        } finally {`
- **finally**: Success or failure, rendu case-layum idhu run aagum.

**Line 199:** `            submitBtn.disabled = false;`
- Explanation: Button lock-a remove pannuthu (User thirumba try panna mudiyum).

**Line 200:** `            submitBtn.textContent = 'Submit';`
- Explanation: Button text-a original "Submit" nu reset pannuthu.

**Line 201:** `        }`
- Explanation: Try/Catch/Finally closing.

**Line 202:** `    }`
- Explanation: saveDonation function closing.

**Line 203:** `});`
- Explanation: DOMContentLoaded event listener closing (Line 1 closing).

**Line 204:** (Empty line)
- Explanation: File-oda mudivu.

---

## Summary for Code Review:

### Key Features:
1. **Dynamic Campaign Loading**: 
   - URL-la ID irundha specific campaign load aagum
   - ID illai-na automatic-ah first approved campaign display aagum

2. **User Input Handling**:
   - Preset amount buttons (₹100, ₹500, etc.)
   - Custom amount input option
   - Payment method selection (UPI, Card, etc.)

3. **Validation Layer**:
   - Amount validation (Empty, negative, non-numeric check)
   - Payment method mandatory check
   - Real-time error display and clearing

4. **QR Code Modal**:
   - Dynamic popup creation
   - QR code generation via API
   - Optional donor name input
   - Click outside to close functionality

5. **Backend Integration**:
   - Asynchronous data fetching
   - POST request to save donation
   - Error handling for network issues
   - Success/failure user feedback

6. **Form Reset**:
   - Automatic form clearing after successful donation
   - Button state management
   - Loading states during submission

### Technical Highlights:
- **100% Asynchronous**: Ella backend calls-um `async/await` use pannuthu
- **Error Resilient**: Try/Catch blocks-la proper error handling
- **User Experience**: Loading states, validation feedback, success messages
- **Flexible Design**: Auto-pick mode + specific campaign mode support
- **Security**: User ID from localStorage, validation before submission

---

**End of donate.js Explanation**
