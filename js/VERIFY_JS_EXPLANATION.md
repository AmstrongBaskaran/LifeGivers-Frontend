# verify.js - Absolute 100% Every Single Line & Word-by-Word Explanation (Thanglish)

Indha document-la `verify.js`-oda **ovvoru variyaiyum (Line 1 to 127)** oru vari kuda vidama, andha vari-la irukka **ovvoru vaarthaiyaiyum (Word-by-Word)** clear-ah explain panni irukkaen.

---

### Line-by-Line Breakdown

**Line 1:** `/**`
- Explanation: Idhu oru comment-oda thodakkam.

**Line 2:** ` * verify.js`
- Explanation: File peyar-a comment-la eludhurom.

**Line 3:** ` * Admin logic for individual fundraiser document verification & approval.`
- Explanation: Indha file admin-kaga create pannadhu nu solra vilakkam.

**Line 4:** ` */`
- Explanation: Comment block mudivu.

**Line 6:** `document.addEventListener('DOMContentLoaded', async () => {`
- **document**: Namma web page html content.
- **addEventListener**: Page load aagi mudichudha nu kavanikka (listen panna) vaikira tool.
- **'DOMContentLoaded'**: Browser html tags-a full-ah read panni mudichuttu ready aana udane idhu trigger aagum.
- **async**: Idhu asynchronous function. Backend la irundhu data vara neram aagum, adhuvara wait panna use aagum.
- **() => {**: Idhu oru arrow function. Page load aana udane idhukkulla irukka code run aagum.

**Line 7:** `    const urlParams = new URLSearchParams(window.location.search);`
- **const**: Maatha mudiyatha variable create panna.
- **urlParams**: URL-la irukka parameters-a (Ex: `?id=123`) pirichu edukka use aagura tool.
- **window.location.search**: Browser URL bar-la `?` kku aprom irukka ellathayum (query string) edukkum.

**Line 8:** `    const fundraiserId = urlParams.get('id');`
- **fundraiserId**: Andha parameters-la irundhu `id` oda value-a mattum thaniya pirichu 'fundraiserId' variable-la podurom.

**Line 9:** `    const API_BASE_URL = 'https://life-givers-backend.vercel.app';`
- **API_BASE_URL**: Namma data vaanga pora backend server-oda mukkiyamana address.

**Line 11:** `    if (!fundraiserId) {`
- **if**: Check pannuthu.
- **!fundraiserId**: ID edhuvum URL-la illaiya? (Empty ah irukka?)

**Line 12:** `        showError('No fundraiser ID provided in URL');`
- **showError**: Error message-a screen-la kaattu nu namma eludhiya function-a koopidurom.

**Line 13:** `        return;`
- **return**: ID illana vela seiya mudiyadhu, so ingaye niruthi veliya po.

**Line 14:** `    }`
- Explanation: If condition mudivu.

**Line 16:** `    try {`
- **try**: Error handling block. Indha block-kulla irukka code-a first try pannum.

**Line 17:** `        // Fetch full details of the specific fundraiser by ID`
- Explanation: Oru kurippitta fundraiser-oda details-a edukka porom nu solra comment.

**Line 18:** `        const response = await fetch(\`\${API_BASE_URL}/fundraiser/\${fundraiserId}\`);`
- **const response**: Varugira pathil-a 'response' variable-la store panrom.
- **await**: Backend-la irundhu pathil vara varaikkum wait pannu.
- **fetch**: Internet vazhiya andha specific ID-ku request anuppi details kekkura function.

**Line 20:** `        if (!response.ok) {`
- **if**: Check pannuthu.
- **!response.ok**: Pathil sariya varalaya? (404 Not Found or 500 Error).

**Line 21:** `            throw new Error('Fundraiser records not found on server');`
- **throw**: Oru pudhu error-a create panni veliya thooki podu (Catch block-ku).

**Line 22:** `        }`
- Explanation: If condition mudivu.

**Line 24:** `        const fundraiser = await response.json();`
- **const fundraiser**: Data-va 'fundraiser' variable-la store panrom.
- **await**: Convert aagi mudiyura vara wait pannu.
- **response.json()**: Vandha pathil-a JavaScript object format-ku maathuthu.

**Line 25:** `        displayFundraiser(fundraiser);`
- **displayFundraiser**: Indha data-va vachu screen-la fill pannu nu function-a koopidurom.

**Line 27:** `        // Event Listeners for Buttons`
- Explanation: Buttons click panna enna nadakanum nu set panna porom.

**Line 28:** `        document.getElementById('approve-btn').addEventListener('click', () => updateStatus('approved'));`
- **getElementById('approve-btn')**: Approve button-a edukkuthu.
- **addEventListener('click')**: Click pannuna...
- **updateStatus('approved')**: Status-a 'approved' nu maathu nu backend-ku sollu.

**Line 29:** `        document.getElementById('reject-btn').addEventListener('click', () => updateStatus('rejected'));`
- **getElementById('reject-btn')**: Reject button-a edukkuthu.
- **updateStatus('rejected')**: Status-a 'rejected' nu maathu nu backend-ku sollu.

**Line 31:** `    } catch (error) {`
- **catch**: Mela try block-la edhavadhu prechanai vandha inga pudikkum.

**Line 32:** `        console.error('Fetch Error:', error);`
- **console.error**: Developer-ku therira mari console-la error print pannu.

**Line 33:** `        showError(error.message);`
- **showError**: User-ku error message-a screen-la kaattu.

**Line 34:** `    }`
- Explanation: Try/Catch closing.

**Line 36:** `    /**`
- Explanation: Documentation comment start.

**Line 37:** `     * Display fundraiser details in the UI`
- Explanation: UI-la details-a epdi kaatturadhu nu solra function.

**Line 38:** `     */`
- Explanation: Comment closing.

**Line 39:** `    function displayFundraiser(data) {`
- **function**: Oru pudhu velai (action) define panrom.
- **data**: Backend-la irundhu vandha fundraiser details.

**Line 40:** `        document.getElementById('loading').style.display = 'none';`
- Explanation: Loading spinner-a maraichi (`none`).

**Line 41:** `        document.getElementById('fundraiser-details').style.display = 'block';`
- Explanation: Main details box-a kaattu (`block`).

**Line 43:** `        // Basic Information`
- Explanation: Basic details fill panna porom.

**Line 44:** `        document.getElementById('campaign-title').textContent = data.campaign_title || 'N/A';`
- **textContent**: Text-a maathuthu.
- **|| 'N/A'**: Data illana 'N/A' (Not Available) nu podu.

**Line 45:** `        document.getElementById('category').textContent = data.category || 'N/A';`
- Explanation: Category fill pannuthu.

**Line 46:** `        document.getElementById('target-amount').textContent = '₹' + (data.target_amount ? data.target_amount.toLocaleString('en-IN') : '0');`
- Explanation: Amount-a India format-la comma pottu, munnadi '₹' symbol pottu kaattuthu.

**Line 47:** `        document.getElementById('location').textContent = data.location || 'N/A';`
- Explanation: Location fill pannuthu.

**Line 49:** `        // Patient Information`
- Explanation: Patient details section.

**Line 50:** `        document.getElementById('patient-name').textContent = data.patient_name || 'N/A';`
- Explanation: Patient name fill.

**Line 51:** `        document.getElementById('patient-age').textContent = data.patient_age || 'N/A';`
- Explanation: Age fill.

**Line 52:** `        document.getElementById('relation').textContent = data.patient_relation || 'N/A';`
- Explanation: Relation fill.

**Line 53:** `        document.getElementById('hospital-name').textContent = data.hospital_name || 'N/A';`
- Explanation: Hospital name fill.

**Line 55:** `        // Editable Story`
- Explanation: Story edit panra vasadhi.

**Line 56:** `        document.getElementById('story-editor').value = data.story_text || '';`
- **value**: Input box-la irukka text-a set pannuthu (Modify panra mari).

**Line 58:** `        // Payment / Financial Info`
- Explanation: Bank details section.

**Line 59:** `        document.getElementById('bank-account').textContent = data.bank_account_number || 'N/A';`
- Explanation: Account number fill.

**Line 60:** `        document.getElementById('ifsc').textContent = data.ifsc_code || 'N/A';`
- Explanation: IFSC code fill.

**Line 61:** `        document.getElementById('phone_number').textContent = data.phone_number || 'Not provided';`
- Explanation: Phone number fill.

**Line 62:** `        document.getElementById('pan').textContent = data.pan_number || 'Not provided';`
- Explanation: PAN card number fill.

**Line 64:** `        // Document Proof Links`
- Explanation: Upload panna documents-a view panna link create panra logic.

**Line 65:** `        const setProofLink = (id, url) => {`
- **setProofLink**: Oru chinna helper function. ID-ayum URL-ayum vangum.

**Line 66:** `            const card = document.getElementById(id);`
- Explanation: HTML-la andha document card-a edukkum.

**Line 67:** `            if (url && card) {`
- Explanation: URL-um irundhu, card-um irundha dhaan ulla pogum.

**Line 68:** `                card.querySelector('.proof-preview').innerHTML =`
- **querySelector**: Card kulla irukka '.proof-preview' class-a kandupidikkum.
- **innerHTML**: HTML content-a maathum.

**Line 69:** `                    \`<a href="\${url}" target="_blank" class="document-link">View Original File</a>\`;`
- **a href**: Click panna andha document open aaga link create pannuthu.
- **target="_blank"**: Pudhu tab-la open pannu.

**Line 70:** `            }`
- Explanation: If condition closing.

**Line 71:** `        };`
- Explanation: Helper function closing.

**Line 73:** `        setProofLink('medical-proof', data.medical_report_url);`
- Explanation: Medical report link set pannuthu.

**Line 74:** `        setProofLink('hospital-proof', data.hospital_report_url);`
- Explanation: Hospital report link set pannuthu.

**Line 75:** `        setProofLink('id-proof', data.id_proof_url);`
- Explanation: ID proof link set pannuthu.

**Line 76:** `        setProofLink('campaign-image', data.campaign_image_url);`
- Explanation: Campaign image link set pannuthu.

**Line 77:** `    }`
- Explanation: displayFundraiser function closing.

**Line 79:** `    /**`
- Explanation: Comment.

**Line 80:** `     * Update campaign status (Approve/Reject)`
- Explanation: Status update panra function vilakkam.

**Line 81:** `     */`
- Explanation: Comment closing.

**Line 82:** `    async function updateStatus(status) {`
- **updateStatus**: Approve/Reject button click panna idhu run aagum. 'status' input-ah varum.

**Line 84:** `        // Confirm action with Admin`
- Explanation: Admin kita urudhiya kekra comment.

**Line 85:** `        if (!confirm(\`Are you sure you want to \${status.toUpperCase()} this fundraiser?\`)) return;`
- **confirm**: Browser-la "Are you sure?" nu oru yes/no box varum.
- **!**: "Cancel" (No) kudutha return aagi veliya poidum.

**Line 87:** `        const approveBtn = document.getElementById('approve-btn');`
- Explanation: Approve button variables-ah edukkuthu.

**Line 88:** `        const rejectBtn = document.getElementById('reject-btn');`
- Explanation: Reject button variables-ah edukkuthu.

**Line 89:** `        const storyText = document.getElementById('story-editor').value;`
- Explanation: Edit panna story text-a edukkuthu (Oruvelai admin story-a thiruthi irundha).

**Line 91:** `        // UI Feedback`
- Explanation: Button-a disable panra logic.

**Line 92:** `        approveBtn.disabled = true;`
- Explanation: Button-a click panna mudiyama aakkuthu (Double click thadukka).

**Line 93:** `        rejectBtn.disabled = true;`
- Explanation: Reject button-ayum lock pannuthu.

**Line 94:** `        const originalText = approveBtn.textContent;`
- Explanation: Button mela irundha pazhaya text-a save panni vekkurom.

**Line 95:** `        approveBtn.textContent = 'Processing...';`
- Explanation: Button mela "Processing..." nu ezhuthurom.

**Line 97:** `        try {`
- Explanation: API call try panrom.

**Line 98:** `            let url = \`\${API_BASE_URL}/fundraiser/\${fundraiserId}/status?status=\${status}\`;`
- Explanation: Backend status update URL-a construct panrom.

**Line 100:** `            // Send modified story only on approval`
- Explanation: Approve pannumbodhu mattum story anuppa logic.

**Line 101:** `            if (status === 'approved') {`
- Explanation: Check if verify Approved.

**Line 102:** `                url += \`&story_text=\${encodeURIComponent(storyText)}\`;`
- **+=**: URL kooda story text-a serthukkuthu.
- **encodeURIComponent**: Special characters (space, comma) URL-la prechanai pannama irukka encode pannuthu.

**Line 103:** `            }`
- Explanation: If condition closing.

**Line 105:** `            const response = await fetch(url, { method: 'PATCH' });`
- **fetch**: URL-ku request anupputhu.
- **method: 'PATCH'**: Putham pudhusa create pannama, irukkuradha 'update' panna PATCH method use panrom.

**Line 106:** `            // Alert success and return to list`
- Explanation: Success comment.

**Line 107:** `            if (!response.ok) throw new Error('Failed to update status on server');`
- Explanation: Error check. Server ok sollalana error throw pannu.

**Line 109:** `            alert(\`Campaign has been \${status} successfully.\`);`
- Explanation: Success pop-up message.

**Line 110:** `            window.location.href = './profile_verify.html';`
- Explanation: Verify list page-ku thirumba po.

**Line 112:** `        } catch (error) {`
- Explanation: Error catch block.

**Line 113:** `            console.error('Update Error:', error);`
- Explanation: Console error log.

**Line 114:** `            alert('Error updating status: ' + error.message);`
- Explanation: User-ku error alert.

**Line 115:** `            approveBtn.disabled = false;`
- Explanation: Button lock-a thirakkuthu (Retry panna).

**Line 116:** `            rejectBtn.disabled = false;`
- Explanation: Reject button unlock.

**Line 117:** `            approveBtn.textContent = originalText;`
- Explanation: Button text-a pazhaya padi maathuthu.

**Line 118:** `        }`
- Explanation: Try/Catch closing.

**Line 119:** `    }`
- Explanation: updateStatus function closing.

**Line 121:** `    function showError(message) {`
- **showError**: Error kaatta oru common function.

**Line 122:** `        document.getElementById('loading').style.display = 'none';`
- Explanation: Loading-a maraikkuthu.

**Line 123:** `        const errDiv = document.getElementById('error-message');`
- Explanation: Error box element-a edukkuthu.

**Line 124:** `        errDiv.style.display = 'block';`
- Explanation: Error box-a veliya kaattuthu.

**Line 125:** `        document.getElementById('error-text').textContent = message;`
- Explanation: Error text-a box-kulla eludhuthu.

**Line 126:** `    }`
- Explanation: Function closing.

**Line 127:** `});`
- Explanation: DOMContentLoaded function closing (Line 6).

