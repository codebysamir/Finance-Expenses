///////////////////////////////////////////////////////////////////   Overview Menu   /////////////////////////////////////////////////////////////////

const monthPickerBtn = document.querySelector('#monthPicker')
const monthPickerMenu = document.querySelector('.chooseMonthMenu')
const overlay = document.querySelector('.overlay')

const allMonthFilter = document.querySelectorAll('.monthFilter')
allMonthFilter.forEach(filter => {
    filter.firstElementChild.nextSibling.textContent = monthPicker(new Date().getMonth())
    filter.addEventListener('click', () => {
        overlay.classList.toggle('active')
        monthPickerMenu.classList.toggle('active');
    })
})
const allPrevMonthBtn = document.querySelectorAll('.prevMonth')
allPrevMonthBtn.forEach(btns => {
    btns.addEventListener('click', () => {
        const activeMonth = monthsRow.querySelector('.active')
        if (monthsRow.querySelector('.active')) monthsRow.querySelector('.active').classList.toggle('active')
        activeMonth.previousElementSibling.classList.toggle('active')
        deselectRest(monthsRow.querySelector('.active'))
        monthPickerSetBtn()
    })
})
const allNextMonthBtn = document.querySelectorAll('.nextMonth')
allNextMonthBtn.forEach(btns => {
    btns.addEventListener('click', () => {
        const activeMonth = monthsRow.querySelector('.active')
        if (monthsRow.querySelector('.active')) monthsRow.querySelector('.active').classList.toggle('active')
        activeMonth.nextElementSibling.classList.toggle('active')
        deselectRest(monthsRow.querySelector('.active'))
        monthPickerSetBtn()
    })
})

const settingsMenuBtn = document.querySelector('#settings')
const navSettingsMenu = document.querySelector('nav.settingsMenu')
settingsMenuBtn.addEventListener('click', () => {
    navSettingsMenu.classList.toggle('hidden')
})

const categoriesBtn = document.querySelector('#categoriesBtn')
const categoriesMenu = document.querySelector('.categories')
categoriesBtn.addEventListener('click', () => {
    overviewMenu.classList.toggle('active')
    categoriesMenu.classList.toggle('active')
})

const overviewMenu = document.querySelector('.expensesApp')
const cashBalanceEl = overviewMenu.querySelector('.cashBalance')
const currentBalanceMenu = document.querySelector('.currentBalance')

cashBalanceEl.addEventListener('click', () => {
    // currentBalanceMenu.classList.toggle('active')
    // overviewMenu.classList.toggle('active')
})

currentBalanceMenu.firstElementChild.firstElementChild.addEventListener('click', () =>{
    currentBalanceMenu.classList.toggle('active')
    overviewMenu.classList.toggle('active')
})

const incomeMenu = document.querySelector('.income')
const incomeCashEL = overviewMenu.querySelector('.cashIncome')

incomeCashEL.addEventListener('click', () => {
    incomeMenu.classList.toggle('active')
    overviewMenu.classList.toggle('active')
})

incomeMenu.firstElementChild.firstElementChild.addEventListener('click', () => {
    incomeMenu.classList.toggle('active')
    overviewMenu.classList.toggle('active')
})

const expensesMenu = document.querySelector('.expenses')
const expensesCashEL = overviewMenu.querySelector('.cashExpenses')

expensesCashEL.addEventListener('click', () => {
    expensesMenu.classList.toggle('active')
    overviewMenu.classList.toggle('active')
})

expensesMenu.firstElementChild.firstElementChild.addEventListener('click', () => {
    expensesMenu.classList.toggle('active')
    overviewMenu.classList.toggle('active')
})

const accountsMenu = document.querySelector('.accounts')
const accountsBtn = overviewMenu.querySelector('#accountsBtn')

accountsBtn.addEventListener('click', () => {
    accountsMenu.classList.toggle('active')
    overviewMenu.classList.toggle('active')
})

accountsMenu.firstElementChild.firstElementChild.addEventListener('click', () => {
    accountsMenu.classList.toggle('active')
    overviewMenu.classList.toggle('active')
})

const homeBtn = accountsMenu.querySelector('#homeBtn')

homeBtn.addEventListener('click', () => {
    accountsMenu.classList.toggle('active')
    overviewMenu.classList.toggle('active')
})

const addBtn = overviewMenu.querySelector('#addBtn')
const addMenu = document.querySelector('.add-container')
const addMenuCloseBtn = addMenu.lastElementChild.firstElementChild

addBtn.addEventListener('click', () => {
    addMenu.classList.toggle('active')
    overlay.classList.toggle('active')
    addBtn.classList.toggle('rotateBack')
    addMenuCloseBtn.classList.toggle('rotateBack')
})

addMenuCloseBtn.addEventListener('click', () => {
    addMenu.classList.toggle('active')
    overlay.classList.toggle('active')
    addBtn.classList.toggle('rotateBack')
    addMenuCloseBtn.classList.toggle('rotateBack')
})

function checkTransactionHistoryIsEmpty() {
    const allTransactionHistorys = document.querySelectorAll('.transactionHistory')
    allTransactionHistorys.forEach(historys => {
        const noTransactionText = document.createElement('h2')
        noTransactionText.classList.add('noTransactionsText')
        noTransactionText.textContent = 'No Transactions'
        if (historys.children.length === 0) {
            historys.appendChild(noTransactionText)
        } else if (historys.children.length === 1 && historys.querySelector('.noTransactionsText')) {
            return
        } else if (historys.querySelector('.notDisplayed')) {
            let childDisplayedCounter = 0
            Array.from(historys.children).forEach(child => {
                if (child.classList.contains('noTransactionsText') || child.classList.contains('notDisplayed')) return
                childDisplayedCounter++
            })
            if (childDisplayedCounter !== 0) {
                if (!historys.querySelector('.noTransactionsText')) return
                historys.removeChild(historys.querySelector('.noTransactionsText'))    
            } else {
                if (historys.querySelector('.noTransactionsText')) return
                historys.appendChild(noTransactionText)
            }
        } else {
            if (!historys.querySelector('.noTransactionsText')) return
            historys.removeChild(historys.querySelector('.noTransactionsText'))
        }
    })
}

/////////////////////////////////////////////////////////////////  Accounts Menu  ////////////////////////////////////////////////////////////////

const accountAddBtn = accountsMenu.querySelector('#addBtn')
accountAddBtn.addEventListener('click', () => {
    createAccountMenu.classList.toggle('active')
    prevAccountRow(overlay)
})

const cashAndBankAccountEntrys = accountsMenu.querySelectorAll('.accountEntry')
cashAndBankAccountEntrys.forEach(accEntry => {
    accEntry.addEventListener('click', (e) => {
        prevPage(accountsMenu)
        document.querySelector(`.accountEntryDetails[data-acc-id="${e.target.dataset.accId}"]`).classList.toggle('active')
    })
})

const reorderAccBtn = accountsMenu.firstElementChild.lastElementChild
reorderAccBtn.addEventListener('click', () => {
    reorderPopUp.classList.toggle('active')
    overlay.classList.toggle('active')
    showCreatedAccounts()
})

function sumCurrentAccountBalance() {
    let balanceTotal = 0.00
    const currentBalanceTotal = overviewMenu.querySelector('.balanceAmount')
    const allAccountsTotal = accountsMenu.querySelector('.totalAmount')
    const allAccountEntrys = accountsMenu.querySelectorAll('.accountEntry')
    allAccountEntrys.forEach(acc => {
        balanceTotal += +acc.querySelector('.accountTotal').textContent
    })

    currentBalanceTotal.textContent = Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(balanceTotal)
    allAccountsTotal.textContent = Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(balanceTotal)
}

function sumAccountTotal(accountTag) {
    let accountTotal = 0.00
    const accountName = accountsMenu.querySelector(`[data-acc-id="${accountTag}"]`)
    const accountTotalBalance = accountName.querySelector('.accountTotal')
    const allEntrysFromAccount = overviewMenu.querySelectorAll('.balanceEntry')
    const accEntryDetailsTotalBal = document.querySelector(`.accountEntryDetails[data-acc-id="${accountTag}"] .tagTotalAmount`)

    allEntrysFromAccount.forEach(accEntry => {
        if (!accEntry.querySelector(`[data-acc-id="${accountTag}"]`)) return
        if (accEntry.dataset.entryType === 'income') {
            accountTotal += +accEntry.querySelector('.amount').firstElementChild.textContent
        }
        if (accEntry.dataset.entryType === 'expenses') {
            accountTotal -= +accEntry.querySelector('.amount').firstElementChild.textContent
        }
        if (accEntry.dataset.entryType === 'transfer') {
            const withdrawlAccount = accEntry.querySelector('.tags').firstElementChild.firstElementChild
            const depositAccount = accEntry.querySelector('.tags').firstElementChild.lastElementChild
            if (withdrawlAccount.dataset.accId === `${accountTag}`) {
                accountTotal -= +accEntry.querySelector('.amount').firstElementChild.textContent
            } else {
                accountTotal += +accEntry.querySelector('.amount').firstElementChild.textContent
            }
        }
    })
    accountTotalBalance.textContent = Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(accountTotal)
    accEntryDetailsTotalBal.textContent = Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(accountTotal)
}

function sumCategorieTotal(categorieTag) {
    let categorieTotal = 0.00
    const categorieName = categoriesMenu.querySelector(`[data-cat-id="${categorieTag}"]`)
    const categorieTotalBalance = categorieName.querySelector('.categorieTotal')
    const allEntrysFromCatMenu = overviewMenu.querySelectorAll('.balanceEntry')
    const catEntryDetailsTotalBal = document.querySelector(`.categorieEntryDetails[data-cat-id="${categorieTag}"] .tagTotalAmount`)

    allEntrysFromCatMenu.forEach(catEntry => {
        if (!catEntry.querySelector(`[data-cat-id="${categorieTag}"]`)) return
        if (catEntry.dataset.entryType === 'income') {
            categorieTotal += +catEntry.querySelector('.amount').firstElementChild.textContent
        }
        if (catEntry.dataset.entryType === 'expenses') {
            categorieTotal -= +catEntry.querySelector('.amount').firstElementChild.textContent
        }
    })
    categorieTotalBalance.textContent = Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(categorieTotal)
    catEntryDetailsTotalBal.textContent = Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(categorieTotal)
}

function sumAccountsThisMonthBalance(accountTag) {
    let accThisMonthIncomeTotal = 0.00
    let accThisMonthExpensesTotal = 0.00
    const accountName = accountsMenu.querySelector(`[data-acc-id="${accountTag}"]`)
    const accThisMonthIncomeBalance = accountName.querySelector('.accountIncome .amountTotal')
    const accThisMonthExpensesBalance = accountName.querySelector('.accountExpense .amountTotal')
    const allEntrysFromAccount = overviewMenu.querySelectorAll('.balanceEntry')
    const thisMonth = monthPicker(new Date().getMonth())
    allEntrysFromAccount.forEach(TA => {
        if (!TA.querySelector(`[data-acc-id="${accountTag}"]`)) return
        if (TA.dataset.month === thisMonth) {
            if (TA.dataset.entryType === 'income') {
                accThisMonthIncomeTotal += +TA.querySelector('.amount').firstElementChild.textContent
            }
            if (TA.dataset.entryType === 'expenses') {
                accThisMonthExpensesTotal += +TA.querySelector('.amount').firstElementChild.textContent
            }
        }
    })

    accThisMonthIncomeBalance.textContent = Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(accThisMonthIncomeTotal)
    accThisMonthExpensesBalance.textContent = Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(accThisMonthExpensesTotal)
}

function sumCategoriesThisMonthBalance(categorieTag) {
    let catThisMonthIncomeTotal = 0.00
    let catThisMonthExpensesTotal = 0.00
    const categorieName = categoriesMenu.querySelector(`[data-cat-id="${categorieTag}"]`)
    const catThisMonthIncomeBalance = categorieName.querySelector('.categorieIncome .amountTotal')
    const catThisMonthExpensesBalance = categorieName.querySelector('.categorieExpense .amountTotal')
    const allEntrysFromCatMenu = overviewMenu.querySelectorAll('.balanceEntry')
    const thisMonth = monthPicker(new Date().getMonth())
    allEntrysFromCatMenu.forEach(TA => {
        if (!TA.querySelector(`[data-cat-id="${categorieTag}"]`)) return
        if (TA.dataset.month === thisMonth) {
            if (TA.dataset.entryType === 'income') {
                catThisMonthIncomeTotal += +TA.querySelector('.amount').firstElementChild.textContent
            }
            if (TA.dataset.entryType === 'expenses') {
                catThisMonthExpensesTotal += +TA.querySelector('.amount').firstElementChild.textContent
            }
        }
    })

    catThisMonthIncomeBalance.textContent = Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(catThisMonthIncomeTotal)
    catThisMonthExpensesBalance.textContent = Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(catThisMonthExpensesTotal)
}

function sumAccountsIncomeAndExpensesAmount(menu) {
    let tagIncomeTotal = 0.00
    let tagExpensesTotal = 0.00
    let tagIncomeTransactions = 0
    let tagExpensesTransactions = 0
    const incomeTotalAmount = menu.querySelector('.incomeForTag .amount')
    const expensesTotalAmount = menu.querySelector('.expensesForTag .amount')
    const incomeTransactionNrs = menu.querySelector('.incomeForTag .transactionsNr')
    const expensesTransactionNrs = menu.querySelector('.expensesForTag .transactionsNr')
    const allTransactions = menu.querySelectorAll('.balanceEntryDate')
    allTransactions.forEach(transaction => {
        if (transaction.classList.contains('notDisplayed')) return
        Array.from(transaction.children).forEach(child => {
            if (child.dataset.entryType === 'income') {
                tagIncomeTotal += +child.querySelector('.amount').firstElementChild.textContent
                tagIncomeTransactions += 1
            }
            if (child.dataset.entryType === 'expenses') {
                tagExpensesTotal += +child.querySelector('.amount').firstElementChild.textContent
                tagExpensesTransactions += 1
            }
        })
    })

    incomeTransactionNrs.textContent = tagIncomeTransactions
    expensesTransactionNrs.textContent = tagExpensesTransactions
    incomeTotalAmount.textContent = Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(tagIncomeTotal)
    expensesTotalAmount.textContent = Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(tagExpensesTotal)
}

/////////////////////////////////////////////////////////////////  Choose Account Menu  ////////////////////////////////////////////////////////////////


const chooseAccountMenu = document.querySelector('.chooseAccountMenu')
const accountsRow = chooseAccountMenu.querySelector('.accountsRow')
const allAccountsRow = document.querySelectorAll('.accountsRow')
const addNewAccountBtn = accountsRow.lastElementChild

allAccountsRow.forEach(row => {
    const accountsTag = row.querySelectorAll('.accounts-tag')
    accountsTag.forEach(tag => {
        tag.addEventListener('click', () => {
            refreshAccountRow()
            const accsSameID = document.querySelectorAll('#' + tag.id)
            accsSameID.forEach(acc => addAccounts(acc, acc.firstElementChild.style.backgroundColor))
        })
    })
})

addNewAccountBtn.addEventListener('click', () => {
    prevAccountRow(chooseAccountMenu)
    document.querySelector('.newAccountMenu').classList.toggle('active')
})

function addAccounts(tag, tagColor) {
    if (tag.classList.contains('active')) {
        refreshAccountRow()
    } else {
        tag.classList.toggle('active')
        tag.style.backgroundColor = tagColor
    }
}

function refreshAccountRow() {
    const allAccountsRow = document.querySelectorAll('.accountsRow')
    allAccountsRow.forEach(rows => {
        const activeAccountsTag = rows.querySelectorAll('.active')
        activeAccountsTag.forEach(activated => {
            activated.classList.toggle('active');
            activated.style.backgroundColor = ''
        })
    })
    
}

const amountToAdd = chooseAccountMenu.querySelector('.amountToAdd').getElementsByClassName('amount')[0]
const numberKeypadBtns = chooseAccountMenu.querySelector('.numberKeypad').querySelectorAll('.numbers')
numberKeypadBtns.forEach(numberKey => {
    numberKey.addEventListener('click', () => {
        if (amountToAdd.textContent == 0) {
            amountToAdd.textContent = numberKey.textContent
        } else {
            if (amountToAdd.textContent.charAt(amountToAdd.textContent.length -3) == '.') {
                amountToAdd.textContent = numberKey.textContent
            } else {
                amountToAdd.textContent += numberKey.textContent
            } 
        }
    })
})

const deleteBtn = chooseAccountMenu.querySelector('.numberKeypad').querySelector('.delete')
deleteBtn.addEventListener('click', () => {
    if (amountToAdd.textContent.charAt(amountToAdd.textContent.length -3) == '.') return amountToAdd.textContent = 0;
    amountToAdd.textContent = amountToAdd.textContent.slice(0, -1)
    if (amountToAdd.textContent != "") return
    amountToAdd.textContent = 0;
})

function refreshChooseAccountAmountToAdd() {
    const activeAmount = chooseAccountMenu.querySelector('.amountToAdd').querySelector('.amount')
    if (activeAmount.textContent == '0') return
    activeAmount.textContent = '0'
}

const closeBottomMenu = chooseAccountMenu.querySelector('.closeBottomMenu')

closeBottomMenu.firstElementChild.addEventListener('click', () => {
    chooseAccountMenu.classList.toggle('active')
    overlay.classList.toggle('active')
    refreshChooseAccountAmountToAdd()
})

closeBottomMenu.lastElementChild.addEventListener('click', () => {
    chooseAccountMenu.classList.toggle('active')
    if (entryType !== 'transfer') {
        document.querySelector('.chooseCategoryMenu').classList.toggle('active')
    } else {
        overlay.classList.toggle('active')
    }
    if (amountToAdd.textContent.charAt(amountToAdd.textContent.length -3) !== '.' && amountToAdd.textContent.charAt(amountToAdd.textContent.length -2) == '.') amountToAdd.textContent += '0'
    if (amountToAdd.textContent.charAt(amountToAdd.textContent.length -3) !== '.') amountToAdd.textContent += '.00'
    const activeEntryDetail = document.querySelector('.entryDetail.active')
    const allAddedAmountSpans = activeEntryDetail.querySelectorAll('.addedAmount')
    allAddedAmountSpans.forEach(span => span.textContent = amountToAdd.textContent)

    const activeEntryTitle = activeEntryDetail.querySelector('.title')
    activeEntryTitle.focus()
})



///////////////////////////////////////////////////////////////////  Create New Account  ///////////////////////////////////////////////////////////////////


const createAccountMenu = document.querySelector('.newAccountMenu')
const accountNameIcon = createAccountMenu.querySelector('.categoryName').querySelector('span')
const accountNameIconClone = accountNameIcon.cloneNode(true)
const accountNameInput = createAccountMenu.querySelector('.categoryName').querySelector('input')

accountNameIcon.addEventListener('click', () => {
    chooseIconMenu.classList.toggle('active')
    prevMenu(createAccountMenu)
})

const createAccountColorRow = createAccountMenu.querySelector('.colorRow')
const createAccountColor = createAccountMenu.querySelector('.colorRow').querySelectorAll('span')
createAccountColor.forEach(color => {
    color.addEventListener('click', () => {
        createAccountColorRow.querySelector('.active').classList.toggle('active')
        color.classList.toggle('active')
    })
})

let prevAccountRowElm = ''
function prevAccountRow(menü) {
    menü.classList.toggle('active')
    prevAccountRowElm = menü
}

createAccountMenu.lastElementChild.firstElementChild.addEventListener('click', () => {
    createAccountMenu.classList.toggle('active')
    prevAccountRowElm.classList.toggle('active')
})

createAccountMenu.lastElementChild.lastElementChild.addEventListener('click', () => {
    createAccountMenu.classList.toggle('active')
    prevAccountRowElm.classList.toggle('active')
    saveNewAccount(newAccount())
})

const accountsStorage = JSON.parse(localStorage.getItem('accounts')) || []

function newAccount() {
    const newAccountName = accountNameInput.value
    const newAccountIcon = chooseIconMenu.querySelector('.active').firstElementChild.classList[1]
    const newAccountColor = createAccountColorRow.querySelector('.active').style.backgroundColor
    return addDataToNewAccount(newAccountName, newAccountIcon, newAccountColor)    
}

function addDataToNewAccount(accName, icon, color) {
    accountsStorage.push({
        accName,
        icon,
        color
    })
    localStorage.setItem('accounts', JSON.stringify(accountsStorage))
    return {accName, icon, color}
}

function saveNewAccount({accName, icon, color}) {
    let nameExisting
    Array.from(accountsRow.children).forEach( acc => {
        while (acc.id == accountNameInput.value) {
            nameExisting = true
            break;
        }
    })
    if (nameExisting) {
        alert('Ein Account mit diesem Namen existiert bereits.')
    } else {
        const newAccountName = accName
        const newAccountIcon = icon
        const newAccountColor = color
        const newAccountHTML = `<span id="${newAccountName}" class="tags-big accounts-tag"><i class="fa-solid ${newAccountIcon} tags-circle-small" style="background-color: ${newAccountColor};"></i>${newAccountName}</span>`
        let newAccount
        refreshAccountRow()
        const allAccountsRow = document.querySelectorAll('.accountsRow')
        allAccountsRow.forEach(rows => {
            rows.insertAdjacentHTML("afterbegin", newAccountHTML)
            newAccount = rows.querySelector(`#${newAccountName}`)
            newAccount.addEventListener('click', (e) => {
                refreshAccountRow()
                const accsSameID = document.querySelectorAll('#' + e.target.id)
                accsSameID.forEach(acc => addAccounts(acc, newAccountColor))
            })
            newAccount.classList.toggle('active')
            newAccount.style.backgroundColor = newAccountColor
        })
    
        reNewSecondAccountRow(newTransferEntryPage)
        const transferEntryPage = document.querySelector('.entryDetail.active.transferEntryPage')
        if (transferEntryPage) reNewSecondAccountRow(transferEntryPage)
        
        const accountsBody = accountsMenu.querySelector('.accountsBody')
        const accountEntry = document.createElement('div')
        accountEntry.classList.add('accountEntry')
        accountEntry.dataset.accId = newAccountName
        const accountEntryHTML = `
        <div class="accountInfo" style="background-color: ${newAccountColor};">
          <span class="accountEntryName"><i class="fa-solid ${newAccountIcon} tags-circle-small"></i>${newAccountName}</span>
          <div class="accountAmountTotal">
            <span class="accountTotal">0.00</span>
            <span class="currency">CHF</span>
          </div>
        </div>
        <div class="balanceThisMonth">
          <div class="accountIncome">
            <span>Income diesen Monat</span>
            <div class="ThisMonthIncomeTotal">
              <span class="amountTotal"><b>0.00</b></span>
              <span class="currency">CHF</span>
            </div>
          </div>
          <div class="accountExpense">
            <span>Expenses diesen Monat</span>
            <div class="ThisMonthExpensesTotal">
              <span class="amountTotal"><b>0.00</b></span>
              <span class="currency">CHF</span>
            </div>
          </div>
        </div>`
        accountEntry.insertAdjacentHTML('afterbegin', accountEntryHTML)
        accountsBody.appendChild(accountEntry)
        accountEntry.addEventListener('click', () => {
            prevPage(accountsMenu)
            accountEntryDetails.classList.toggle('active')
        })
        

        const accountEntryDetails = document.createElement('div')
        accountEntryDetails.classList.add('accountEntryDetails')
        accountEntryDetails.classList.add('tagDetails')
        accountEntryDetails.classList.add('container')
        accountEntryDetails.dataset.accId = newAccountName
        accountEntryDetails.style.backgroundColor = newAccountColor
        const accountEntryDetailsHTML = `
        <div class="tagTopMenu topMenu">
            <button class="closeAccBtn"><i class="fa-solid fa-xmark fa-fw"></i></button>
            <button class="editAccBtn"><i class="fa-solid fa-pen"></i>Edit</button>
            <button class="deleteAccBtn"><i class="fa-solid fa-trash-can fa-fw"></i></button>
        </div>  
        <div class="tagBody">
            <div class="cashBalForTag box-3">
                <h2><i class="fa-solid ${newAccountIcon} tags-circle-small"></i>${newAccountName}</h2>
                <div class="tagTotalBalance">
                    <span class="Currency">CHF</span>
                    <span class="tagTotalAmount">1'200</span>
                </div>
            </div>
            <div class="incomeForTag tagBox box-3">
                <h4>Income</h4>
                <spav class="amount">0.00</spav>
                <span class="Currency">Schweizer Franken</span>
                <span class="transactionsNr">0</span>
                <span>transactions</span>
                <button>Add Income</button>
            </div>
            <div class="expensesForTag tagBox box-3">
                <h4>Expenses</h4>
                <spav class="amount">0.00</spav>
                <span class="Currency">Schweizer Franken</span>
                <span class="transactionsNr">0</span>
                <span>transactions</span>
                <button>Add Expenses</button>
            </div>
        </div>
        <div class="tagOverviewBottomMenu">
            <div class="monthlyView">
                <span class="prevMonth"><i class="fa-solid fa-angle-left"></i></span>
                <span class="monthFilter tagWtBtn"><i class="fa-solid fa-calendar"></i>März</span>
                <span class="nextMonth"><i class="fa-solid fa-angle-right"></i></span>
            </div>
            <div class="transactionHistory">
            </div>
        </div>`
        accountEntryDetails.insertAdjacentHTML('afterbegin', accountEntryDetailsHTML)
        document.body.appendChild(accountEntryDetails)

        accountEntryDetails.firstElementChild.firstElementChild.addEventListener('click', () => {
            accountEntryDetails.classList.toggle('active')
            prevPageArr[0].classList.toggle('active')
            prevPageArr.shift()
        })

        const accountEditBtn = accountEntryDetails.querySelector('.editAccBtn')
        accountEditBtn.addEventListener('click', () => {
            overlay.classList.toggle('active')
            editAccountMenu.classList.toggle('active')
            const editAccountInput = editAccountMenu.querySelector('input')
            const editAccountIcon = editAccountMenu.querySelector('.accountName span')
            const editAccountColors = editAccountMenu.querySelectorAll('.colorRow span')
            editAccountInput.value = accountEntryDetails.querySelector('h2').textContent
            editAccountIcon.firstElementChild.classList.replace(editAccountIcon.firstElementChild.classList[1], accountEntryDetails.querySelector('h2').firstElementChild.classList[1])
            editAccountColors.forEach(color => {
                if (color.style.backgroundColor !== accountEntryDetails.style.backgroundColor) return
                if (color.classList.contains('active')) return
                editAccountMenu.querySelector('.colorRow .active').classList.toggle('active')
                color.classList.toggle('active')
            })
        })

        const tagDetailsMonthFilter = accountEntryDetails.querySelector('.monthFilter')
        tagDetailsMonthFilter.firstElementChild.nextSibling.textContent = monthPicker(new Date().getMonth())
        tagDetailsMonthFilter.addEventListener('click', () => {
            overlay.classList.toggle('active')
            monthPickerMenu.classList.toggle('active');
        })

        const addIncomeBtn = accountEntryDetails.querySelector('.incomeForTag').lastElementChild
        addIncomeBtn.addEventListener('click', () => {
            prevOverview(accountEntryDetails)
            newIncomeEntryPage.classList.toggle('active')
            chooseAccountMenu.classList.toggle('active')
            overlay.classList.toggle('active')
            refreshTitle()
            refreshCategoryRow()
            refreshCategoryTag()
            refreshDescription()
            refreshDate()
            refreshTransactionRow()
            refreshAddedAmount()
            refreshChooseAccountAmountToAdd()
            checkEntryType()        
        })

        const addExpensesBtn = accountEntryDetails.querySelector('.expensesForTag').lastElementChild
        addExpensesBtn.addEventListener('click', () => {
            prevOverview(accountEntryDetails)
            newExpensesEntryPage.classList.toggle('active')
            chooseAccountMenu.classList.toggle('active')
            overlay.classList.toggle('active')
            refreshTitle()
            refreshCategoryRow()
            refreshCategoryTag()
            refreshDescription()
            refreshDate()
            refreshTransactionRow()
            refreshAddedAmount()
            refreshChooseAccountAmountToAdd()
            checkEntryType()        
        })

        const allPrevMonthBtn = accountEntryDetails.querySelectorAll('.prevMonth')
        allPrevMonthBtn.forEach(btns => {
            btns.addEventListener('click', () => {
                const activeMonth = monthsRow.querySelector('.active')
                if (monthsRow.querySelector('.active')) monthsRow.querySelector('.active').classList.toggle('active')
                activeMonth.previousElementSibling.classList.toggle('active')
                deselectRest(monthsRow.querySelector('.active'))
                monthPickerSetBtn()
            })
        })
        const allNextMonthBtn = accountEntryDetails.querySelectorAll('.nextMonth')
        allNextMonthBtn.forEach(btns => {
            btns.addEventListener('click', () => {
                const activeMonth = monthsRow.querySelector('.active')
                if (monthsRow.querySelector('.active')) monthsRow.querySelector('.active').classList.toggle('active')
                activeMonth.nextElementSibling.classList.toggle('active')
                deselectRest(monthsRow.querySelector('.active'))
                monthPickerSetBtn()
            })
        })        

        const deleteAccountBtn = accountEntryDetails.querySelector('.deleteAccBtn')
        deleteAccountBtn.addEventListener('click', () => {
            deleteAccountConfirmation.classList.toggle('active')
            overlay.classList.toggle('active')
        })
    }
}


///////////////////////////////////////////////////////////////////  Edit Account Menu  /////////////////////////////////////////////////////////////////

const editAccountMenu = document.querySelector('.editAccountMenu')
const editAccountInput = editAccountMenu.querySelector('input')
const editAccountIconElm = editAccountMenu.querySelector('.accountName span')
const editAccountIcon = editAccountMenu.querySelector('.accountName span').firstElementChild
const editAccountColorRow = editAccountMenu.querySelector('.colorRow')

Array.from(editAccountColorRow.children).forEach(color => {
    color.addEventListener('click', () => {
        if (color.classList.contains('active')) return
        editAccountMenu.querySelector('.colorRow .active').classList.toggle('active')
        color.classList.toggle('active')
    })
})

editAccountIconElm.addEventListener('click', () => {
    chooseIconMenu.classList.toggle('active')
    prevMenu(editAccountMenu)
})

editAccountMenu.lastElementChild.firstElementChild.addEventListener('click', () => {
    overlay.classList.toggle('active')
    editAccountMenu.classList.toggle('active')
})

editAccountMenu.lastElementChild.lastElementChild.addEventListener('click', () => {
    const activeAccountDetailPage = document.querySelector('.tagDetails.active')
    const activeAccountName = activeAccountDetailPage.querySelector('h2').firstElementChild.nextSibling
    const activeAccountIcon = activeAccountDetailPage.querySelector('h2').firstElementChild
    const activeAccountEntry = accountsMenu.querySelector(`.accountEntry[data-acc-id="${activeAccountDetailPage.dataset.accId}"]`)
    const activeAccountEntryName = activeAccountEntry.querySelector('.accountEntryName').firstElementChild.nextSibling
    const activeAccountEntryIcon = activeAccountEntry.querySelector('.accountEntryName').firstElementChild
    const activeAccountEntryInfo = activeAccountEntry.querySelector('.accountInfo')
    const allActiveAccTransactions = document.querySelectorAll(`.balanceEntry .accounts-tag[data-acc-id="${activeAccountDetailPage.dataset.accId}"]`)
    const allEntryDetailPages = document.querySelectorAll('.entryDetail')
    const oldAccountName = activeAccountName.textContent

    activeAccountDetailPage.dataset.accId = editAccountInput.value
    activeAccountName.textContent = editAccountInput.value
    activeAccountIcon.classList.replace(activeAccountIcon.classList[1], editAccountIcon.classList[1])
    activeAccountDetailPage.style.backgroundColor = editAccountColorRow.querySelector('.active').style.backgroundColor
    activeAccountEntry.dataset.accId = editAccountInput.value
    activeAccountEntryName.textContent = editAccountInput.value
    activeAccountEntryIcon.classList.replace(activeAccountEntryIcon.classList[1], editAccountIcon.classList[1])
    activeAccountEntryInfo.style.backgroundColor = editAccountColorRow.querySelector('.active').style.backgroundColor

    accountsStorage.forEach(obj => {
        if (obj.accName !== oldAccountName) return
        obj.accName = editAccountInput.value
        obj.icon = editAccountIcon.classList[1]
        obj.color = editAccountColorRow.querySelector('.active').style.backgroundColor
    })
    localStorage.setItem('accounts', JSON.stringify(accountsStorage))

    Array.from(accountsRow.children).forEach(account => {
        if (!account.id) return
        if (account.id === oldAccountName) {
            account.id = editAccountInput.value
            account.firstElementChild.nextSibling.textContent = editAccountInput.value
            account.firstElementChild.classList.replace(account.firstElementChild.classList[1], editAccountIcon.classList[1])
            account.firstElementChild.style.backgroundColor = editAccountColorRow.querySelector('.active').style.backgroundColor
        }
    })
    if (allActiveAccTransactions.length === 0) {
        allEntryDetailPages.forEach(entry => {
            const entryAccountsRow = entry.querySelector('.accountsRow')
            Array.from(entryAccountsRow.children).forEach(account => {                
                if (account.id !== oldAccountName) return
                account.id = editAccountInput.value
                account.firstElementChild.nextSibling.textContent = editAccountInput.value
                account.firstElementChild.classList.replace(account.firstElementChild.classList[1], editAccountIcon.classList[1])
                account.firstElementChild.style.backgroundColor = editAccountColorRow.querySelector('.active').style.backgroundColor
                if (account.classList.contains('active')) account.style.backgroundColor = editAccountColorRow.querySelector('.active').style.backgroundColor
            })
        })
    }
    allActiveAccTransactions.forEach(accTransactions => {
        accTransactions.dataset.accId = editAccountInput.value
        accTransactions.firstElementChild.nextSibling.textContent = editAccountInput.value
        accTransactions.firstElementChild.classList.replace(accTransactions.firstElementChild.classList[1], editAccountIcon.classList[1])
        accTransactions.firstElementChild.style.backgroundColor = editAccountColorRow.querySelector('.active').style.backgroundColor
        
        const accTransactionsBalanceEntry = accTransactions.parentElement.parentElement.parentElement
        allEntryDetailPages.forEach(entry => {
            const entryAccountsRow = entry.querySelector('.accountsRow')
            Array.from(entryAccountsRow.children).forEach(account => {                
                if (account.id !== oldAccountName) return
                account.id = editAccountInput.value
                account.firstElementChild.nextSibling.textContent = editAccountInput.value
                account.firstElementChild.classList.replace(account.firstElementChild.classList[1], editAccountIcon.classList[1])
                account.style.backgroundColor = editAccountColorRow.querySelector('.active').style.backgroundColor
                account.firstElementChild.style.backgroundColor = editAccountColorRow.querySelector('.active').style.backgroundColor
                if (!entry.id) return
                if (entry.id !== accTransactionsBalanceEntry.dataset.id) return
                accTransactionsBalanceEntry.click()
                entry.querySelector('.actionBottomMenu').lastElementChild.lastElementChild.click()
                if (entry.classList.contains('active')) entry.classList.toggle('active')
                if (prevOverviewEl.classList.contains('active')) prevOverviewEl.classList.toggle('active')
            })
        })
    })


    overlay.classList.toggle('active')
    editAccountMenu.classList.toggle('active')
    if (!activeAccountDetailPage.classList.contains('active')) activeAccountDetailPage.classList.toggle('active')
})


/////////////////////////////////////////////////////////////////  Choose Category Menu  ////////////////////////////////////////////////////////////////


const chooseCategoryMenu = document.querySelector('.chooseCategoryMenu')
const categoryRow = chooseCategoryMenu.querySelector('.categoriesRow')
const categoryTagList = categoryRow.getElementsByClassName('category-tag')
const categoryTagList2 = categoryRow.querySelectorAll('.category-tag')
const minusIconHTML = '<i class="fa-solid fa-minus fa-fw" style="background-color: var(--grey1); border-radius: var(--circle-radius); padding: 0.3em; width: 1.1em"></i>'

function refreshCategoryRow() {
    const activeCategoriesTag = categoryRow.querySelectorAll('.active')
    activeCategoriesTag.forEach(activated => {
        activated.classList.toggle('active');
        activated.removeChild(chooseCategoryMenu.querySelector('.fa-minus'));
    })
}

function addCategory(tag) {
    if (tag.classList.contains('active')) {
        refreshCategoryRow()
        refreshCategoryTag()
    } else {
        refreshCategoryRow()
        tag.classList.toggle('active')
        tag.insertAdjacentHTML("beforeend", minusIconHTML)
        chooseCategoryMenu.classList.toggle('active')
        overlay.classList.toggle('active')
        categoryChange()
    }
}



categoryRow.lastElementChild.addEventListener('click', () => {
    document.querySelector('.createCategoryMenu').classList.toggle('active')
    document.querySelector('.createCategoryMenu').querySelector('.categoryName').getElementsByTagName('input')[0].value = ''
    document.querySelector('.createCategoryMenu').querySelector('.categoryName').getElementsByTagName('input')[0].focus()
    chooseCategoryMenu.classList.toggle('active')
})

chooseCategoryMenu.lastElementChild.firstElementChild.addEventListener('click', () => {
    chooseCategoryMenu.classList.toggle('active')
    overlay.classList.toggle('active')
    
})
chooseCategoryMenu.lastElementChild.lastElementChild.addEventListener('click', () => {
    chooseCategoryMenu.classList.toggle('active')
    overlay.classList.toggle('active')
    document.querySelector('.entryDetail.active').querySelector('.title').focus()
})

function categoryChange() {
    const activeEntryDetail = document.querySelector('.entryDetail.active')
    const catTag = activeEntryDetail.querySelector('.category-tag')
    if (!categoryRow.querySelector('.active')) return
    catTag.innerHTML = categoryRow.querySelector('.active').innerHTML
    catTag.style.backgroundColor = categoryRow.querySelector('.active').firstElementChild.style.backgroundColor
    catTag.dataset.catId = categoryRow.querySelector('.active').id
    catTag.classList.remove('border')
    catTag.removeChild(catTag.querySelector('.fa-minus'));
    catTag.insertAdjacentHTML("beforeend", '<i class="fa-solid fa-chevron-right fa-fw"></i>')
}


function refreshCategoryTag() {
    const activeEntryDetail = document.querySelector('.entryDetail.active')
    const catTag = activeEntryDetail.querySelector('.category-tag')
    if (!document.querySelector('.entryDetail.active').querySelector('.category-tag').childNodes[2]) return
    catTag.innerHTML = '<i class="fa-solid fa-slash"></i>Add category'
    catTag.style.backgroundColor = 'transparent'
    catTag.classList.add('border')
    catTag.dataset.catId = 'noCategory'
}



//////////////////////////////////////////////////////////////////  Create Category Menu  /////////////////////////////////////////////////////////////////


const createCategoryMenu = document.querySelector('.createCategoryMenu')
const chooseIconMenu = document.querySelector('.chooseIconMenu')
const categoryNameIcon = createCategoryMenu.querySelector('.categoryName').querySelector('span')
const categoryNameIconClone = categoryNameIcon.cloneNode(true)
const categoryNameInput = createCategoryMenu.querySelector('.categoryName').querySelector('input')

categoryNameIcon.addEventListener('click', () => {
    chooseIconMenu.classList.toggle('active')
    prevMenu(createCategoryMenu)
})

const categoryColorRow = createCategoryMenu.querySelector('.colorRow')
const categoryColor = createCategoryMenu.querySelector('.colorRow').querySelectorAll('span')
categoryColor.forEach(color => {
    color.addEventListener('click', () => {
        categoryColorRow.querySelector('.active').classList.toggle('active')
        color.classList.toggle('active')
    })
})

createCategoryMenu.lastElementChild.firstElementChild.addEventListener('click', () => {
    createCategoryMenu.classList.toggle('active')
    if (document.querySelector('.entryDetail.active')) {
        chooseCategoryMenu.classList.toggle('active')
    } else {
        prevAccountRowElm.classList.toggle('active')
    }
})

createCategoryMenu.lastElementChild.lastElementChild.addEventListener('click', () => {
    createCategoryMenu.classList.toggle('active')
    if (document.querySelector('.entryDetail.active')) {
        chooseCategoryMenu.classList.toggle('active')
    } else {
        prevAccountRowElm.classList.toggle('active')
    }
    addNewCategory(newCategory())
})

const categoriesStorage = JSON.parse(localStorage.getItem('categories')) || []

function newCategory() {
    const newCategoryName = categoryNameInput.value
    const newCategoryIcon = chooseIconMenu.querySelector('.active').firstElementChild.classList[1]
    const newCategoryColor = categoryColorRow.querySelector('.active').style.backgroundColor

    return addDataToCreateCategory(newCategoryName, newCategoryIcon, newCategoryColor)
}

function addDataToCreateCategory(catName, icon, color) {
    
    categoriesStorage.push({
        catName,
        icon,
        color
    })
    localStorage.setItem('categories', JSON.stringify(categoriesStorage))
    
    return {catName, icon, color}
}

function addNewCategory({catName, icon, color}) {
    const newCategoryName = catName
    const newCategoryIcon = icon
    const newCategoryColor = color
    const newCategoryHTML = `<span id="${newCategoryName}" class="tags-big category-tag"><i class="fa-solid ${newCategoryIcon} tags-circle-small" style="background-color: ${newCategoryColor};"></i>${newCategoryName}</span>`
    categoryRow.insertAdjacentHTML("afterbegin", newCategoryHTML)
    const newCategory = categoryRow.firstElementChild
    if (document.querySelector('.entryDetail.active')) addCategory(newCategory)
    newCategory.addEventListener('click', () => addCategory(newCategory))

    const categoriesBody = categoriesMenu.querySelector('.categoriesBody')
    const categorieEntry = document.createElement('div')
    categorieEntry.classList.add('categorieEntry')
    categorieEntry.dataset.catId = newCategoryName
    const categorieEntryHTML = `
    <div class="categorieInfo" style="background-color: ${newCategoryColor};">
      <span class="categorieEntryName"><i class="fa-solid ${newCategoryIcon} tags-circle-small"></i>${newCategoryName}</span>
      <div class="categorieAmountTotal">
        <span class="categorieTotal">0.00</span>
        <span class="currency">CHF</span>
      </div>
    </div>
    <div class="balanceThisMonth">
      <div class="categorieIncome">
        <span>Income diesen Monat</span>
        <div class="ThisMonthIncomeTotal">
          <span class="amountTotal"><b>0.00</b></span>
          <span class="currency">CHF</span>
        </div>
      </div>
      <div class="categorieExpense">
        <span>Expenses diesen Monat</span>
        <div class="ThisMonthExpensesTotal">
          <span class="amountTotal"><b>0.00</b></span>
          <span class="currency">CHF</span>
        </div>
      </div>
    </div>`
    categorieEntry.insertAdjacentHTML('afterbegin', categorieEntryHTML)
    categoriesBody.appendChild(categorieEntry)
    categorieEntry.addEventListener('click', () => {
        prevPage(categoriesMenu)
        categorieEntryDetails.classList.toggle('active')
    })

    const categorieEntryDetails = document.createElement('div')
    categorieEntryDetails.classList.add('categorieEntryDetails')
    categorieEntryDetails.classList.add('tagDetails')
    categorieEntryDetails.classList.add('container')
    categorieEntryDetails.dataset.catId = newCategoryName
    categorieEntryDetails.style.backgroundColor = newCategoryColor
    const categorieEntryDetailsHTML = `
    <div class="tagTopMenu topMenu">
        <button class="closeCatBtn"><i class="fa-solid fa-xmark fa-fw"></i></button>
        <button class="editCatBtn"><i class="fa-solid fa-pen"></i>Edit</button>
        <button class="deleteCatBtn"><i class="fa-solid fa-trash-can fa-fw"></i></button>
    </div>  
    <div class="tagBody">
        <div class="cashBalForTag box-3">
            <h2><i class="fa-solid ${newCategoryIcon} tags-circle-small"></i>${newCategoryName}</h2>
            <div class="tagTotalBalance">
                <span class="Currency">CHF</span>
                <span class="tagTotalAmount">1'200</span>
            </div>
        </div>
        <div class="incomeForTag tagBox box-3">
            <h4>Income</h4>
            <spav class="amount">0.00</spav>
            <span class="Currency">Schweizer Franken</span>
            <span class="transactionsNr">0</span>
            <span>transactions</span>
            <button>Add Income</button>
        </div>
        <div class="expensesForTag tagBox box-3">
            <h4>Expenses</h4>
            <spav class="amount">0.00</spav>
            <span class="Currency">Schweizer Franken</span>
            <span class="transactionsNr">0</span>
            <span>transactions</span>
            <button>Add Expenses</button>
        </div>
    </div>
    <div class="tagOverviewBottomMenu">
        <div class="monthlyView">
            <span class="prevMonth"><i class="fa-solid fa-angle-left"></i></span>
            <span class="monthFilter tagWtBtn"><i class="fa-solid fa-calendar"></i>März</span>
            <span class="nextMonth"><i class="fa-solid fa-angle-right"></i></span>
        </div>
        <div class="transactionHistory">
        </div>
    </div>`
    categorieEntryDetails.insertAdjacentHTML('afterbegin', categorieEntryDetailsHTML)
    document.body.appendChild(categorieEntryDetails)

    categorieEntryDetails.firstElementChild.firstElementChild.addEventListener('click', () => {
        categorieEntryDetails.classList.toggle('active')
        prevPageArr[0].classList.toggle('active')
        prevPageArr.shift()
    })

    const categorieEditBtn = categorieEntryDetails.querySelector('.editCatBtn')
    categorieEditBtn.addEventListener('click', () => {
        overlay.classList.toggle('active')
        editCategoryMenu.classList.toggle('active')
        const editCategoryInput = editCategoryMenu.querySelector('input')
        const editCategoryIcon = editCategoryMenu.querySelector('.categoryName span')
        const editCategoryColors = editCategoryMenu.querySelectorAll('.colorRow span')
        editCategoryInput.value = categorieEntryDetails.querySelector('h2').textContent
        editCategoryIcon.firstElementChild.classList.replace(editCategoryIcon.firstElementChild.classList[1], categorieEntryDetails.querySelector('h2').firstElementChild.classList[1])
        editCategoryColors.forEach(color => {
            if (color.style.backgroundColor !== categorieEntryDetails.style.backgroundColor) return
            if (color.classList.contains('active')) return
            editCategoryMenu.querySelector('.colorRow .active').classList.toggle('active')
            color.classList.toggle('active')
        })
    })

    const categorieDeleteBtn = categorieEntryDetails.querySelector('.deleteCatBtn')
    const deleteCategoryConfirmation = document.querySelector('.deleteCategory')
    categorieDeleteBtn.addEventListener('click', () => {
        overlay.classList.toggle('active')
        deleteCategoryConfirmation.classList.toggle('active')
    })

    const tagDetailsMonthFilter = categorieEntryDetails.querySelector('.monthFilter')
    tagDetailsMonthFilter.firstElementChild.nextSibling.textContent = monthPicker(new Date().getMonth())
    tagDetailsMonthFilter.addEventListener('click', () => {
        overlay.classList.toggle('active')
        monthPickerMenu.classList.toggle('active');
    })

    const addIncomeBtn = categorieEntryDetails.querySelector('.incomeForTag').lastElementChild
    addIncomeBtn.addEventListener('click', () => {
        prevOverview(categorieEntryDetails)
        newIncomeEntryPage.classList.toggle('active')
        chooseAccountMenu.classList.toggle('active')
        overlay.classList.toggle('active')
        refreshTitle()
        refreshCategoryRow()
        refreshCategoryTag()
        refreshDescription()
        refreshDate()
        refreshTransactionRow()
        refreshAddedAmount()
        refreshChooseAccountAmountToAdd()
        checkEntryType()        
    })

    const addExpensesBtn = categorieEntryDetails.querySelector('.expensesForTag').lastElementChild
    addExpensesBtn.addEventListener('click', () => {
        prevOverview(categorieEntryDetails)
        newExpensesEntryPage.classList.toggle('active')
        chooseAccountMenu.classList.toggle('active')
        overlay.classList.toggle('active')
        refreshTitle()
        refreshCategoryRow()
        refreshCategoryTag()
        refreshDescription()
        refreshDate()
        refreshTransactionRow()
        refreshAddedAmount()
        refreshChooseAccountAmountToAdd()
        checkEntryType()        
    })

    const allPrevMonthBtn = categorieEntryDetails.querySelectorAll('.prevMonth')
    allPrevMonthBtn.forEach(btns => {
        btns.addEventListener('click', () => {
            const activeMonth = monthsRow.querySelector('.active')
            if (monthsRow.querySelector('.active')) monthsRow.querySelector('.active').classList.toggle('active')
            activeMonth.previousElementSibling.classList.toggle('active')
            deselectRest(monthsRow.querySelector('.active'))
            monthPickerSetBtn()
        })
    })
    const allNextMonthBtn = categorieEntryDetails.querySelectorAll('.nextMonth')
    allNextMonthBtn.forEach(btns => {
        btns.addEventListener('click', () => {
            const activeMonth = monthsRow.querySelector('.active')
            if (monthsRow.querySelector('.active')) monthsRow.querySelector('.active').classList.toggle('active')
            activeMonth.nextElementSibling.classList.toggle('active')
            deselectRest(monthsRow.querySelector('.active'))
            monthPickerSetBtn()
        })
    })    
}



///////////////////////////////////////////////////////////////////  Edit Category Menu  /////////////////////////////////////////////////////////////////

const editCategoryMenu = document.querySelector('.editCategoryMenu')
const editCategoryInput = editCategoryMenu.querySelector('input')
const editCategoryIconElm = editCategoryMenu.querySelector('.categoryName span')
const editCategoryIcon = editCategoryMenu.querySelector('.categoryName span').firstElementChild
const editCategoryColorRow = editCategoryMenu.querySelector('.colorRow')

Array.from(editCategoryColorRow.children).forEach(color => {
    color.addEventListener('click', () => {
        if (color.classList.contains('active')) return
        editCategoryMenu.querySelector('.colorRow .active').classList.toggle('active')
        color.classList.toggle('active')
    })
})

editCategoryIconElm.addEventListener('click', () => {
    chooseIconMenu.classList.toggle('active')
    prevMenu(editCategoryMenu)
})

editCategoryMenu.lastElementChild.firstElementChild.addEventListener('click', () => {
    overlay.classList.toggle('active')
    editCategoryMenu.classList.toggle('active')
})

editCategoryMenu.lastElementChild.lastElementChild.addEventListener('click', () => {
    const activeCategoryDetailPage = document.querySelector('.tagDetails.active')
    const activeCategoryName = activeCategoryDetailPage.querySelector('h2').firstElementChild.nextSibling
    const activeCategoryIcon = activeCategoryDetailPage.querySelector('h2').firstElementChild
    const activeCategoryEntry = categoriesMenu.querySelector(`.categorieEntry[data-cat-id="${activeCategoryDetailPage.dataset.catId}"]`)
    const activeCategoryEntryName = activeCategoryEntry.querySelector('.categorieEntryName').firstElementChild.nextSibling
    const activeCategoryEntryIcon = activeCategoryEntry.querySelector('.categorieEntryName').firstElementChild
    const activeCategoryEntryInfo = activeCategoryEntry.querySelector('.categorieInfo')
    const allActiveCatTransactions = document.querySelectorAll(`.balanceEntry .category-tag[data-cat-id="${activeCategoryDetailPage.dataset.catId}"]`)

    categoriesStorage.forEach(obj => {
        if (obj.catName !== activeCategoryName.textContent) return
        obj.catName = editCategoryInput.value
        obj.icon = editCategoryIcon.classList[1]
        obj.color = editCategoryColorRow.querySelector('.active').style.backgroundColor
    })
    localStorage.setItem('categories', JSON.stringify(categoriesStorage))

    Array.from(categoryRow.children).forEach(category => {
        if (!category.id) return
        if (category.id === activeCategoryName.textContent) {
            category.id = editCategoryInput.value
            category.firstElementChild.nextSibling.textContent = editCategoryInput.value
            if (category.firstElementChild.classList[1] === activeCategoryIcon.classList[1]) {
                category.firstElementChild.classList.replace(category.firstElementChild.classList[1], editCategoryIcon.classList[1])
            }
            category.firstElementChild.style.backgroundColor = editCategoryColorRow.querySelector('.active').style.backgroundColor
        }
    })
    allActiveCatTransactions.forEach(catTransactions => {
        catTransactions.dataset.catId = editCategoryInput.value
        catTransactions.firstElementChild.nextSibling.textContent = editCategoryInput.value
        catTransactions.firstElementChild.classList.replace(catTransactions.firstElementChild.classList[1], editCategoryIcon.classList[1])
        catTransactions.style.backgroundColor = editCategoryColorRow.querySelector('.active').style.backgroundColor
        catTransactions.firstElementChild.style.backgroundColor = editCategoryColorRow.querySelector('.active').style.backgroundColor
        
        const catTransactionsBalanceEntry = catTransactions.parentElement.parentElement.parentElement
        const allEntryDetailPages = document.querySelectorAll('.entryDetail')
        allEntryDetailPages.forEach(entry => {
            if (!entry.id) return
            if (entry.id === catTransactionsBalanceEntry.dataset.id) {
                const entryCategoryField = entry.querySelector('.categoryField')
                entryCategoryField.dataset.catId = editCategoryInput.value
                entryCategoryField.firstElementChild.nextSibling.textContent = editCategoryInput.value
                entryCategoryField.firstElementChild.classList.replace(entryCategoryField.firstElementChild.classList[1], editCategoryIcon.classList[1])
                entryCategoryField.style.backgroundColor = editCategoryColorRow.querySelector('.active').style.backgroundColor
                entryCategoryField.firstElementChild.style.backgroundColor = editCategoryColorRow.querySelector('.active').style.backgroundColor
                catTransactions.click()
                entry.querySelector('.actionBottomMenu').lastElementChild.lastElementChild.click()
                if (entry.classList.contains('active')) entry.classList.toggle('active')
                if (prevOverviewEl.classList.contains('active')) prevOverviewEl.classList.toggle('active')
            }
        })
    })
    activeCategoryDetailPage.dataset.catId = editCategoryInput.value
    activeCategoryName.textContent = editCategoryInput.value
    activeCategoryIcon.classList.replace(activeCategoryIcon.classList[1], editCategoryIcon.classList[1])
    activeCategoryDetailPage.style.backgroundColor = editCategoryColorRow.querySelector('.active').style.backgroundColor
    activeCategoryEntry.dataset.catId = editCategoryInput.value
    activeCategoryEntryName.textContent = editCategoryInput.value
    activeCategoryEntryIcon.classList.replace(activeCategoryEntryIcon.classList[1], editCategoryIcon.classList[1])
    activeCategoryEntryInfo.style.backgroundColor = editCategoryColorRow.querySelector('.active').style.backgroundColor

    overlay.classList.toggle('active')
    editCategoryMenu.classList.toggle('active')
    sumCategoriesIncomeAndExpensesAmount()
})


///////////////////////////////////////////////////////////////////  Choose Icon Menu  /////////////////////////////////////////////////////////////////


const iconGrid = chooseIconMenu.querySelector('.iconGrid').querySelectorAll('span')

iconGrid.forEach(icon => {
    icon.addEventListener('click', () => {
        if (icon.classList.contains('active')) return
        chooseIconMenu.querySelector('.iconGrid').querySelector('.active').classList.toggle('active')
        icon.classList.toggle('active')
    })
})

let prevMenuEl = ''
function prevMenu(menu) {
    menu.classList.toggle('active')
    prevMenuEl = menu
}

chooseIconMenu.lastElementChild.firstElementChild.addEventListener('click', () => {
    chooseIconMenu.classList.toggle('active')
    prevMenu(prevMenuEl)
})

chooseIconMenu.lastElementChild.lastElementChild.addEventListener('click', () => {
    chooseIconMenu.classList.toggle('active')
    prevMenu(prevMenuEl)
    let prevMenuIcon = (prevMenuEl === (createCategoryMenu || editCategoryMenu)) ? prevMenuEl.querySelector('.categoryName').querySelector('span') : prevMenuEl.querySelector('.accountName').querySelector('span')
    prevMenuIcon.firstElementChild.classList.replace(prevMenuIcon.firstElementChild.classList[1], chooseIconMenu.querySelector('.active').firstElementChild.classList[1])
})



///////////////////////////////////////////////////////////////////  Add Menu  /////////////////////////////////////////////////////////////////


const addIncomeEntry = addMenu.querySelector('.addIncome')
const addExpensesEntry = addMenu.querySelector('.addExpense')
const addTransferEntry = addMenu.querySelector('.accountTransfer')
const addPlannedPaymentEntry = addMenu.querySelector('.plannedPayment').querySelector('button')

const newIncomeEntryPage = document.querySelector('.newIncomeEntryPage')
const newExpensesEntryPage = document.querySelector('.newExpensesEntryPage')
const newTransferEntryPage = document.querySelector('.newTransferEntryPage')

addIncomeEntry.addEventListener('click', () => {
    addMenu.classList.toggle('active')
    prevOverview(overviewMenu)
    newIncomeEntryPage.classList.toggle('active')
    chooseAccountMenu.classList.toggle('active')
    refreshTitle()
    refreshCategoryRow()
    refreshCategoryTag()
    refreshDescription()
    refreshDate()
    refreshTransactionRow()
    refreshAddedAmount()
    refreshChooseAccountAmountToAdd()
    checkEntryType()
})
addExpensesEntry.addEventListener('click', () => {
    addMenu.classList.toggle('active')
    prevOverview(overviewMenu)
    chooseAccountMenu.classList.toggle('active')
    newExpensesEntryPage.classList.toggle('active')
    refreshTitle()
    refreshCategoryRow()
    refreshCategoryTag()
    refreshDescription()
    refreshDate()
    refreshTransactionRow()
    refreshAddedAmount()
    refreshChooseAccountAmountToAdd()
    checkEntryType()
})
addTransferEntry.addEventListener('click', () => {
    addMenu.classList.toggle('active')
    prevOverview(overviewMenu)
    chooseAccountMenu.classList.toggle('active')
    newTransferEntryPage.classList.toggle('active')
    refreshTitle()
    refreshDescription()
    refreshDate()
    refreshTransactionRow()
    reNewSecondAccountRow(newTransferEntryPage)
    checkEntryType()
})
addPlannedPaymentEntry.addEventListener('click', () => {
    addMenu.classList.toggle('active')
    overviewMenu.classList.toggle('active')
    document.querySelector('.setPaymentMenu').classList.toggle('active')
    newExpensesEntryPage.classList.toggle('active')
})



/////////////////////////////////////////////////////////////////////  New Entry Page  ///////////////////////////////////////////////////////////////////


const entryDetailPages = document.querySelectorAll('.entryDetail')
entryDetailPages.forEach(entrys => {
    entrys.firstElementChild.firstElementChild.addEventListener('click', () => {
        const activeEntryDetail = document.querySelector('.entryDetail.active')
        activeEntryDetail.classList.toggle('active')
        prevOverviewEl.classList.toggle('active')
    })
})
const setTransactionBtn = document.querySelectorAll('.setTransaction')
setTransactionBtn.forEach(btns => {
    btns.addEventListener('click', () => {
        document.querySelector('.setTransactionMenu').classList.toggle('active')
        overlay.classList.toggle('active')
        let pageType = btns.textContent
        document.querySelector('.setTransactionMenu').querySelectorAll('span.box').forEach(span => {
            if (span.textContent == pageType) {
                if (span.querySelector('active')) return
                span.classList.toggle('active')
            }
        })
    })
})

function refreshTitle() {
    const activeEntryDetail = document.querySelector('.entryDetail.active')
    const activeTitle = activeEntryDetail.querySelector('.title')
    if (activeTitle.textContent == '') return
    activeTitle.textContent = ''
}

const categoryField = document.querySelectorAll('.categoryField')
categoryField.forEach(field => {
    field.addEventListener('click', () => {
        chooseCategoryMenu.classList.toggle('active')
        overlay.classList.toggle('active')
    })
})

const descriptionBoxes = document.querySelectorAll('.description')
const editDescriptionMenu = document.querySelector('.editDescriptionMenu')
descriptionBoxes.forEach(desc => {
    desc.addEventListener('click', editDescField)
})

function editDescField(e) {
    overlay.classList.toggle('active')
    editDescriptionMenu.classList.toggle('active')
    const x = addDescription.bind(e)
    editDescriptionMenu.lastElementChild.firstElementChild.addEventListener('click', closeEditDesc, {once: true})

    if (e.target.firstChild.nextSibling.textContent == 'Description') {
        
        editDescriptionMenu.querySelector('input').value = e.target.lastElementChild.textContent
        editDescriptionMenu.querySelector('input').addEventListener('input', afterInputChangeBtn, {once: true})
        editDescriptionMenu.lastElementChild.lastElementChild.outerHTML = '<button style="background-image: var(--BG-img-neon-red)"><i class="fa-solid fa-trash-can"></i>Delete</button>'
        editDescriptionMenu.lastElementChild.lastElementChild.addEventListener('click', () => {
            e.target.firstChild.nextSibling.textContent = 'Add Description'
            e.target.removeChild(e.target.querySelector('br'))
            e.target.removeChild(e.target.querySelector('span'))
            editDescriptionMenu.lastElementChild.lastElementChild.outerHTML = '<button><i class="fa-solid fa-plus"></i>Add</button>'
            editDescriptionMenu.querySelector('input').removeEventListener('input', afterInputChangeBtn)
            editDescriptionMenu.lastElementChild.firstElementChild.removeEventListener('click', closeEditDesc)
            overlay.classList.toggle('active')
            editDescriptionMenu.classList.toggle('active')
        }, {once: true})
    } else {

        editDescriptionMenu.querySelector('input').value = ''
        editDescriptionMenu.lastElementChild.lastElementChild.addEventListener('click', x, {once: true})
    }

    function afterInputChangeBtn() {
        editDescriptionMenu.lastElementChild.lastElementChild.outerHTML = '<button><i class="fa-solid fa-plus"></i>Add</button>'
        editDescriptionMenu.lastElementChild.lastElementChild.addEventListener('click', x, {once: true})
    }


    function closeEditDesc() {
        overlay.classList.toggle('active')
        editDescriptionMenu.classList.toggle('active')
        editDescriptionMenu.querySelector('input').value = ''
        editDescriptionMenu.lastElementChild.lastElementChild.removeEventListener('click', x)
        editDescriptionMenu.querySelector('input').removeEventListener('input', afterInputChangeBtn)
    }

    function addDescription() {
        const descBox = this.target
        if (descBox.firstChild.nextSibling.textContent == 'Description') {
    
            descBox.firstChild.nextSibling.textContent = ''
            descBox.removeChild(descBox.querySelector('br'))
            descBox.removeChild(descBox.querySelector('span'))
        }
        descBox.lastChild.textContent = 'Description'
        const linebreak = document.createElement('br')
        descBox.insertAdjacentElement('beforeend', linebreak)
        const span = document.createElement('span')
        span.style.color = 'var(--grey2)'
        descBox.appendChild(span)
        span.insertAdjacentText('beforeend', editDescriptionMenu.querySelector('input').value)
        editDescriptionMenu.lastElementChild.firstElementChild.removeEventListener('click', closeEditDesc)
        overlay.classList.toggle('active')
        editDescriptionMenu.classList.toggle('active')
    }
}

function refreshDescription() {
    const activeEntryDetail = document.querySelector('.entryDetail.active')
    const descriptionField = activeEntryDetail.querySelector('.description')
    if (!document.querySelector('.entryDetail.active').querySelector('.description').childNodes[2]) return
    descriptionField.innerHTML = '<i class="fa-solid fa-align-left"></i>Add description'
}

const createdInput = document.querySelectorAll('#createdOn')
createdInput.forEach(input => {
    chooseDateTime(input)
})

function chooseDateTime(input) {
    let actualDate = new Date().toISOString().slice(0, 10)
    input.value = actualDate
}

function refreshDate() {
    const activeEntryDetail = document.querySelector('.entryDetail.active')
    const dateInput = activeEntryDetail.querySelector('#createdOn')
    let actualDate = new Date().toISOString().slice(0, 10)
    if (document.querySelector('.entryDetail.active').querySelector('#createdOn').value == actualDate) return
    dateInput.value = actualDate
}

const addedAmount = document.querySelectorAll('.addedAmount')
addedAmount.forEach(amount => {
    amount.addEventListener('click', (e) => {
        overlay.classList.toggle('active')
        chooseAccountMenu.classList.toggle('active')
    })
})

function reUseAmount(e) {
    const chooseAccountAmount = chooseAccountMenu.querySelector('.amountToAdd').querySelector('.amount')
    const eTargetReplicate = e.target.cloneNode(true)
    if (eTargetReplicate.textContent.slice(0, 4) == 0.00) return
    chooseAccountAmount.textContent = e.target.textContent
}

function refreshAddedAmount() {
    const activeEntryDetail = document.querySelector('.entryDetail.active')
    const activeAmount = activeEntryDetail.querySelector('.addedAmount')
    if (activeAmount.textContent == '0.00') return
    activeAmount.textContent = '0.00'
}

entryDetailPages.forEach(entrys => {
    entrys.querySelectorAll('.accountsRow').forEach(rows => {
        rows.lastElementChild.addEventListener('click', () => {
            prevAccountRow(overlay)
            createAccountMenu.classList.toggle('active')
        })
    })
})

function reNewSecondAccountRow(transferPage) {
    const newTransferFirstAccRow = transferPage.querySelector('.accountsRow')
    const newTransferSecAccRow = transferPage.querySelector('.secondAccountsRow')
    let secAccRowArray = []
    
    function clearSecAccRow() {
        Array.from(newTransferSecAccRow.children).forEach(child => {
            if (!newTransferSecAccRow.children) return
            newTransferSecAccRow.removeChild(child)
        })
    }
    clearSecAccRow()

    Array.from(newTransferFirstAccRow.children).forEach(child => {
       secAccRowArray.push(child.cloneNode(true)) 
    }) 
    secAccRowArray.forEach(acc => {
        acc.removeAttribute('id')
        newTransferSecAccRow.appendChild(acc)
    })

    Array.from(newTransferSecAccRow.children).forEach(child => {
        child.addEventListener('click', () => {
            if (newTransferSecAccRow.querySelector('.active')) {
                newTransferSecAccRow.querySelector('.active').style.backgroundColor = ''
                newTransferSecAccRow.querySelector('.active').classList.toggle('active')
            }
            addAccounts(child, child.firstElementChild.style.backgroundColor)
        })
    })
}

/**Verkleinern */
entryDetailPages.forEach(entry => {
    entry.querySelector('.actionBottomMenu').lastElementChild.firstElementChild.addEventListener('click', () => {
        entry.querySelector('.actionBottomMenu').classList.toggle('active')
        entry.querySelector('.smallActionBottomMenu').classList.toggle('active')
        entry.querySelector('.entryDetailBody').classList.add('withSmallBottomMenu')
        const activeAccountSmallBottomMenu = entry.querySelector('.accountsRow').querySelector('.active').cloneNode(true)
        const addedToAccount = entry.querySelector('.addedToAccount')
        addedToAccount.removeChild(addedToAccount.lastElementChild)
        addedToAccount.appendChild(activeAccountSmallBottomMenu)
        addedToAccount.querySelector('.accounts-tag').addEventListener('click', () => {
            entry.querySelector('.actionBottomMenu').classList.toggle('active')
            entry.querySelector('.smallActionBottomMenu').classList.toggle('active')
            entry.querySelector('.entryDetailBody').classList.remove('withSmallBottomMenu')
        })
    })
})
/**Vergrössern */
entryDetailPages.forEach(entry => {
    entry.lastElementChild.lastElementChild.firstElementChild.addEventListener('click', () => {
        entry.querySelector('.actionBottomMenu').classList.toggle('active')
        entry.querySelector('.smallActionBottomMenu').classList.toggle('active')
        entry.querySelector('.entryDetailBody').classList.remove('withSmallBottomMenu')
    })
})
/**Big ActionBottomMenu */
entryDetailPages.forEach(entry => {
    entry.querySelector('.actionBottomMenu').lastElementChild.lastElementChild.addEventListener('click', () => {
        if (entryType === 'transfer') {
            if (entry.querySelector('.accountsRow').querySelector('.active').textContent === entry.querySelector('.secondAccountsRow').querySelector('.active').textContent) {
                alert('Gleicher Transfer Account ausgewählt')
                return
            }
        }
        if (checkIfAmountNull(entry)) return
        saveNewEntry(newTransaction())
    })
})
/**Small ActionBottomMenu */
entryDetailPages.forEach(entry => {
    entry.lastElementChild.lastElementChild.lastElementChild.addEventListener('click', () => {
        if (entryType === 'transfer') {
            if (entry.querySelector('.accountsRow').querySelector('.active').textContent === entry.querySelector('.secondAccountsRow').querySelector('.active').textContent) {
                alert('Gleicher Transfer Account ausgewählt')
                return
            }
        }
        if (checkIfAmountNull(entry)) return
        entry.querySelector('.actionBottomMenu').classList.toggle('active')
        entry.querySelector('.smallActionBottomMenu').classList.toggle('active')
        entry.querySelector('.entryDetailBody').classList.remove('withSmallBottomMenu')
        saveNewEntry(newTransaction())
    })
})

function checkIfAmountNull(entryPage) {
    const entryAddedAmount = entryPage.querySelector('.addedAmount')
    if (entryAddedAmount.textContent === '0' || entryAddedAmount.textContent === '0.00') {
        alert('Amount Betrag ist auf 0.')
        return true
    }
}


const monthsNameInNumbers = {
    'Januar':0,
    'Februar':1,
    'März':2,
    'April':3,
    'Mai':4,
    'Juni':5,
    'Juli':6,
    'August':7,
    'September':8,
    'Oktober':9,
    'November':10,
    'Dezember':11
}

let entryCounter = JSON.parse(localStorage.getItem('entryCounter')) || 0
let orderCounter
let entryType
let entryTypeIcon

function checkEntryType() {
    const activeEntryDetail = document.querySelector('.entryDetail.active')
    switch (activeEntryDetail) {
        case newIncomeEntryPage:
            entryType = 'income'
            entryTypeIcon = 'fa-arrow-down-short-wide'
            break;
        case newExpensesEntryPage:
            entryType = 'expenses'
            entryTypeIcon = 'fa-arrow-up-wide-short'
            break;
        case newTransferEntryPage:
            entryType = 'transfer'
            entryTypeIcon = 'fa-shuffle'
            break;
        case document.querySelector('.entryDetail.active.incomeEntryPage'):
            entryType = 'income'
            entryTypeIcon = 'fa-shuffle'
            break;
        case document.querySelector('.entryDetail.active.expensesEntryPage'):
            entryType = 'expenses'
            entryTypeIcon = 'fa-shuffle'
            break;
        case document.querySelector('.entryDetail.active.transferEntryPage'):
            entryType = 'transfer'
            entryTypeIcon = 'fa-shuffle'
            break;
    }
}

let transactionId

let transactionStorage = JSON.parse(localStorage.getItem('transactions')) || []


function newTransaction() {
    checkEntryType()
    transactionId = (!document.querySelector(`[data-id="${entryType}-entry${entryCounter}"]`)) ? `${entryType}-entry` + entryCounter++ : `${entryType}-entry` + ++entryCounter
    localStorage.setItem('entryCounter', JSON.stringify(entryCounter))

    const activeEntryDetail = document.querySelector('.entryDetail.active').cloneNode(true)
    const activeTitle = activeEntryDetail.querySelector('.title').cloneNode(true)
    const activeCategoryField = (entryType !== 'transfer') ? activeEntryDetail.querySelector('.categoryField').cloneNode(true) : '';
    const activeDescriptionBox = activeEntryDetail.querySelector('.description').cloneNode(true)
    const activeDateInput = activeEntryDetail.querySelector('#createdOn').cloneNode(true)
    const activeAddedAmount = activeEntryDetail.querySelector('.addedAmount').cloneNode(true)
    const activeAddedAmountSmallBottomMenu = activeEntryDetail.querySelector('.smallActionBottomMenu').querySelector('.addedAmount').cloneNode(true)
    const activeAccount = activeEntryDetail.querySelector('.accountsRow').querySelector('.active').cloneNode(true)
    const actualAccountsRow = accountsRow.cloneNode(true)
    const activeSecAccRow = (entryType === 'transfer') ? activeEntryDetail.querySelector('.secondAccountsRow').cloneNode(true) : '';

    const newTransaction = addDataToNewEntry(
        transactionId,
        entryType,
        activeTitle.outerHTML,
        activeCategoryField.outerHTML,
        activeDescriptionBox.outerHTML,
        activeDateInput.value,
        actualAccountsRow.outerHTML,
        activeSecAccRow.outerHTML,
        activeAddedAmount.outerHTML,
        activeAddedAmountSmallBottomMenu.outerHTML)
    return newTransaction
}

function addDataToNewEntry(id, transactionType, title, category, description, date, accountRow, secAccountRow, amount, amountSM) {

    transactionStorage.push({
        id,
        transactionType,
        title,
        category,
        description,
        date,
        accountRow,
        secAccountRow,
        amount,
        amountSM
    })
    localStorage.setItem('transactions', JSON.stringify(transactionStorage))

    return {id, transactionType, title, category, description, date, accountRow, secAccountRow, amount, amountSM}
}

function saveNewEntry({id, transactionType, title, category, description, date, accountRow, secAccountRow, amount, amountSM}) {
    /**Save & Create Entry in Transaction History */
    
    const previousEntryPage = document.querySelector('.entryDetail.active') || ''

    const transactionEntry = document.createElement('div')
    document.body.appendChild(transactionEntry)
    transactionEntry.classList.add(`${transactionType}EntryPage`)
    transactionEntry.classList.add('entryDetail')
    transactionEntry.classList.add('container')
    transactionEntry.id = id

    if (transactionType !== 'transfer') {
        const incomeEntryInnerHTML = `
        <div class="entryDetailTopMenu topMenu"><button>
        <i class="fa-solid fa-xmark fa-fw"></i></button>
        <button class="setTransaction"><i class="fa-solid fa-arrow-down-short-wide fa-fw"></i>Income</button>
        <button class="deleteBtn"><i class="fa-solid fa-trash-can fa-fw"></i></button>
        </div>
        <div class="entryDetailBody">
        <span class="title" contenteditable="true" data-placeholder="Income Title" data-focused-advice="Start typing..."></span>
        <span class="categoryField tags-big lohn-tag category-tag"><i class="fa-solid fa-money-check-dollar"></i>Lohn<i class="fa-solid fa-chevron-right"></i></span>
        <span class="description box"><i class="fa-solid fa-align-left"></i>Add description</span>
        <div class="creationDate box">
        <label for="createdOn"><i class="fa-solid fa-calendar"></i><strong>Created on</strong>
        <input type="text" id="createdOn" onfocus="this.type='date'" onblur="this.type='text'" placeholder="24 März 16:57">
        </label>
        </div>
        </div>
        <div class="actionBottomMenu active">
        <h3>Add money to</h3>
        <div class="accountsRow rows">
        <span class="tags-big accounts-tag active"><i class="fa-solid fa-dollar-sign"></i>Cash</span>
        <span class="tags-big accounts-tag"><i class="fa-solid fa-building-columns"></i>Bank</span>
        <span class="tags-big"><i class="fa-solid fa-plus"></i>Add account</span>
        </div>
        <div class="amount">
        <span class="addedAmount">1000.00</span>
        <span class="currency">CHF</span>
        </div>
        <div class="closeBottomMenu">
        <button><i class="fa-solid fa-chevron-down fa-fw"></i></button>
        <button><i class="fa-solid fa-floppy-disk fa-fw"></i>Save</button>
        </div>
        </div>
        <div class="smallActionBottomMenu">
        <div class="rows">
        <div class="amount">
        <span class="addedAmount">0.00</span>
        <span class="currency">CHF</span>
        </div>
        <div class="addedToAccount">
        <h4>Add money to</h4>
        <span class="tags-big accounts-tag"><i class="fa-solid fa-dollar-sign"></i>Cash</span>
        </div>
        </div>
        <div class="closeBottomMenu">
        <button><i class="fa-solid fa-chevron-up fa-fw"></i></button>
        <button><i class="fa-solid fa-floppy-disk fa-fw"></i>Save</button>
        </div>
        </div>`
        transactionEntry.insertAdjacentHTML('afterbegin', incomeEntryInnerHTML)
    } else {
        const transactionEntryInnerHTML = `<div class="entryDetailTopMenu topMenu">
        <button><i class="fa-solid fa-xmark fa-fw"></i></button>
        <button class="deleteBtn"><i class="fa-solid fa-trash-can fa-fw"></i></button>
      </div>
      <div class="entryDetailBody">
        <span class="title" contenteditable="true" data-placeholder="Transfer Title" data-focused-advice="Start typing...">Transfer title</span>
        <span class="description box"><i class="fa-solid fa-align-left"></i>Add description</span>
        <div class="creationDate box">
          <label for="createdOn"><i class="fa-solid fa-calendar"></i><strong>Created on</strong><input type="text" id="createdOn" onfocus="this.type='date'" onblur="this.type='text'" placeholder="24 März 16:57"></label>
        </div>
      </div>
      <div class="actionBottomMenu active">
        <h3>From</h3>
        <div class="accountsRow rows">
          <span class="tags-big accounts-tag active"><i class="fa-solid fa-dollar-sign"></i>Cash</span>
          <span class="tags-big accounts-tag"><i class="fa-solid fa-building-columns"></i>Bank</span>
          <span class="tags-big"><i class="fa-solid fa-plus"></i>Add account</span>
        </div>
        <h3>To</h3>
        <div class="secondAccountsRow rows">
          <span class="tags-big accounts-tag"><i class="fa-solid fa-dollar-sign"></i>Cash</span>
          <span class="tags-big accounts-tag"><i class="fa-solid fa-building-columns"></i>Bank</span>
          <span class="tags-big"><i class="fa-solid fa-plus"></i>Add account</span>
        </div>
        <span class="addedAmount">1'000.00 CHF</span>
        <div class="closeBottomMenu">
          <button><i class="fa-solid fa-chevron-down fa-fw"></i></button>
          <button><i class="fa-solid fa-floppy-disk fa-fw"></i>Save</button>
        </div>
      </div>
      <div class="smallActionBottomMenu">
        <div class="addedToAccount">
          <span class="tags-big accounts-tag"><i class="fa-solid fa-dollar-sign"></i>Cash</span>
          <span class="tags-big accounts-tag"><i class="fa-solid fa-dollar-sign"></i>Cash</span>
        </div>
        <div class="rows">
          <span class="addedAmount">0.00 CHF</span>
        </div>
        <div class="closeBottomMenu">
          <button><i class="fa-solid fa-chevron-up fa-fw"></i></button>
          <button><i class="fa-solid fa-floppy-disk fa-fw"></i>Save</button>
        </div>
      </div>`
        transactionEntry.insertAdjacentHTML('afterbegin', transactionEntryInnerHTML)
    }

    if (previousEntryPage) {
        previousEntryPage.classList.toggle('active')
        prevOverviewEl.classList.toggle('active')
    }
    
    transactionEntry.firstElementChild.firstElementChild.addEventListener('click', () => {
        closeEditedEntry()
        const activeEntryDetail = document.querySelector('.entryDetail.active')
        activeEntryDetail.classList.toggle('active')
        prevOverviewEl.classList.toggle('active')
    })

    if (transactionType !== 'transfer') {
        const setTransactionTypeBtn = transactionEntry.querySelector('.setTransaction')
        const setTypeText = setTransactionTypeBtn.firstElementChild.nextSibling
        setTypeText.textContent = transactionType
        const firstLetterUpperCase = setTypeText.textContent.charAt().toUpperCase()
        setTypeText.textContent = firstLetterUpperCase + setTypeText.textContent.slice(1)
        setTransactionTypeBtn.addEventListener('click', () => {
            document.querySelector('.setTransactionMenu').classList.toggle('active')
            overlay.classList.toggle('active')
            let pageType = setTransactionTypeBtn.textContent
            document.querySelector('.setTransactionMenu').querySelectorAll('span.box').forEach(span => {
                if (span.textContent == pageType) {
                    if (span.querySelector('active')) return
                    span.classList.toggle('active')
                }
            })
        })
    }

    transactionEntry.firstElementChild.lastElementChild.addEventListener('click', () => {
        overlay.classList.toggle('active')
        const deleteTransaction = document.querySelector('.deleteTransaction')
        deleteTransaction.classList.toggle('active')
    })

    transactionEntry.querySelector('.title').outerHTML = title
    const entryTitle = transactionEntry.querySelector('.title')
    
    let incomeCategory
    if (transactionType !== 'transfer') {
        transactionEntry.querySelector('.categoryField').outerHTML = category
        incomeCategory = transactionEntry.querySelector('.categoryField')
        incomeCategory.addEventListener('click', (e) => {
            chooseCategoryMenu.classList.toggle('active')
            overlay.classList.toggle('active')
            const incomeCategoryInsideCategoriesRow = chooseCategoryMenu.querySelector('.categoriesRow').querySelector('#' + e.target.textContent)
            if (!incomeCategoryInsideCategoriesRow) return
            refreshCategoryRow()
            incomeCategoryInsideCategoriesRow.insertAdjacentHTML("beforeend", minusIconHTML)
            incomeCategoryInsideCategoriesRow.classList.toggle('active')
        })
    }

    transactionEntry.querySelector('.description').outerHTML = description
    const incomeDescription = transactionEntry.querySelector('.description')
    incomeDescription.addEventListener('click', editDescField)

    transactionEntry.querySelector('#createdOn').value = date
    const incomeDate = transactionEntry.querySelector('#createdOn')

    transactionEntry.querySelector('.addedAmount').outerHTML = amount
    const incomeAddedAmount = transactionEntry.querySelector('.addedAmount')
    incomeAddedAmount.addEventListener('click', (e) => {
        overlay.classList.toggle('active')
        chooseAccountMenu.classList.toggle('active')
        reUseAmount(e)
    })

    transactionEntry.querySelector('.smallActionBottomMenu').querySelector('.addedAmount').outerHTML = amountSM
    const incomeAddedAmountSmallBottomMenu = transactionEntry.querySelector('.smallActionBottomMenu').querySelector('.addedAmount')
    incomeAddedAmountSmallBottomMenu.addEventListener('click', (e) => {
        overlay.classList.toggle('active')
        chooseAccountMenu.classList.toggle('active')
        reUseAmount(e)
    })


    transactionEntry.querySelector('.accountsRow').outerHTML = accountRow
    const IncomeAccountRow = transactionEntry.querySelector('.accountsRow')
    IncomeAccountRow.lastElementChild.addEventListener('click', () => {
        prevAccountRow(overlay)
        createAccountMenu.classList.toggle('active')
    })

    Array.from(IncomeAccountRow.children).forEach(child => {
        while (child !== IncomeAccountRow.lastElementChild) {
            child.addEventListener('click', (e) => {
                let accBackgroundColor = child.firstElementChild.style.backgroundColor
                refreshAccountRow()
                const accsSameID = document.querySelectorAll('#' + e.target.id)
                accsSameID.forEach(acc => addAccounts(acc, accBackgroundColor))
            })
            break;
        }
    })

    if (transactionType === 'transfer') {
        transactionEntry.querySelector('.secondAccountsRow').outerHTML = secAccountRow
        const newTransferSecAccRow = transactionEntry.querySelector('.secondAccountsRow')
        Array.from(newTransferSecAccRow.children).forEach(child => {
            child.addEventListener('click', () => {
                if (newTransferSecAccRow.querySelector('.active')) {
                    newTransferSecAccRow.querySelector('.active').style.backgroundColor = ''
                    newTransferSecAccRow.querySelector('.active').classList.toggle('active')
                }
                addAccounts(child, child.firstElementChild.style.backgroundColor)
            })
        })
    }


    const incomeActiveAccount = transactionEntry.querySelector('.accountsRow')
    const TAEntrySecAccountRow = transactionEntry.querySelector('.secondAccountsRow')



    /**Verkleinern */
    transactionEntry.querySelector('.actionBottomMenu').lastElementChild.firstElementChild.addEventListener('click', () => {
        transactionEntry.querySelector('.actionBottomMenu').classList.toggle('active')
        transactionEntry.querySelector('.smallActionBottomMenu').classList.toggle('active')
        transactionEntry.querySelector('.entryDetailBody').classList.add('withSmallBottomMenu')
        const activeAccountSmallBottomMenu = transactionEntry.querySelector('.accountsRow').querySelector('.active').cloneNode(true)
        activeAccountSmallBottomMenu.removeAttribute('id')
        const addedToAccount = transactionEntry.querySelector('.addedToAccount')
        addedToAccount.removeChild(addedToAccount.lastElementChild)
        addedToAccount.appendChild(activeAccountSmallBottomMenu)
        addedToAccount.querySelector('.accounts-tag').addEventListener('click', () => {
            transactionEntry.querySelector('.actionBottomMenu').classList.toggle('active')
            transactionEntry.querySelector('.smallActionBottomMenu').classList.toggle('active')
            transactionEntry.querySelector('.entryDetailBody').classList.remove('withSmallBottomMenu')
        })
    })
    /**Vergrössern */
    transactionEntry.lastElementChild.lastElementChild.firstElementChild.addEventListener('click', () => {
        transactionEntry.querySelector('.actionBottomMenu').classList.toggle('active')
        transactionEntry.querySelector('.smallActionBottomMenu').classList.toggle('active')
        transactionEntry.querySelector('.entryDetailBody').classList.remove('withSmallBottomMenu')
    })
    /**Big ActionBottomMenu */
    transactionEntry.querySelector('.actionBottomMenu').lastElementChild.lastElementChild.addEventListener('click', () => {
        checkEntryType()
        if (entryType === 'transfer') {
            if (transactionEntry.querySelector('.accountsRow').querySelector('.active').textContent === transactionEntry.querySelector('.secondAccountsRow').querySelector('.active').textContent) {
                alert('Gleicher Transfer Account ausgewählt')
                return
            }
        }
        if (checkIfAmountNull(transactionEntry)) return
        saveEditedEntry(transactionHistory, transactionHistoryEntry, transactionHistoryEntryDate)
        saveEditedEntry(AccTransactionHistory, transactionHistoryEntryClone, transactionHistoryEntryDateClone)
        if (CatTransactionHistory) saveEditedEntry(CatTransactionHistory, transactionHistoryEntryCatClone, transactionHistoryEntryDateCatClone)
        if (entryType === 'transfer') saveEditedEntry(transferAccTransactionHistory, transactionHistoryEntryTransferAcc, transactionHistoryEntryDateTransferAcc)
        transactionEntry.classList.toggle('active')
        prevOverviewEl.classList.toggle('active')
    })
    /**Small ActionBottomMenu */
    transactionEntry.lastElementChild.lastElementChild.lastElementChild.addEventListener('click', () => {
        checkEntryType()
        if (entryType === 'transfer') {
            if (transactionEntry.querySelector('.accountsRow').querySelector('.active').textContent === transactionEntry.querySelector('.secondAccountsRow').querySelector('.active').textContent) {
                alert('Gleicher Transfer Account ausgewählt')
                return
            }
        }
        if (checkIfAmountNull(transactionEntry)) return
        transactionEntry.querySelector('.actionBottomMenu').classList.toggle('active')
        transactionEntry.querySelector('.smallActionBottomMenu').classList.toggle('active')
        transactionEntry.querySelector('.entryDetailBody').classList.remove('withSmallBottomMenu')
        saveEditedEntry(transactionHistory, transactionHistoryEntry, transactionHistoryEntryDate)
        saveEditedEntry(AccTransactionHistory, transactionHistoryEntryClone, transactionHistoryEntryDateClone)
        saveEditedEntry(CatTransactionHistory, transactionHistoryEntryCatClone, transactionHistoryEntryDateCatClone)
        if (entryType === 'transfer') saveEditedEntry(transferAccTransactionHistory, transactionHistoryEntryTransferAcc, transactionHistoryEntryDateTransferAcc)
        transactionEntry.classList.toggle('active')
        prevOverviewEl.classList.toggle('active')
    })

    let incomeEntryClone = transactionEntry.cloneNode(true)
    let savedCounter = 1

    function saveEditedEntry(TAHistory, TAHistoryEntry, TAHistoryEntryDate) {
        activeAccId = TAHistoryEntry.querySelector('.accounts-tag').dataset.accId
        AccTransactionHistory = document.querySelector(`.accountEntryDetails[data-acc-id="${activeAccId}"] .transactionHistory`)
        checkEntryType()

        if (transactionEntry.querySelector('.setTransaction').textContent !== incomeEntryClone.querySelector('.setTransaction').textContent) {
            transactionStorage.forEach(obj => {
                if (obj.id === TAHistoryEntry.dataset.id) {
                    const newId = transactionEntry.id
                    const newTransactionType = entryType
                    const newCategoryField = (entryType !== 'transfer') ? transactionEntry.querySelector('.categoryField').outerHTML : ''
                    const newSecTransferRow = (entryType === 'transfer') ? transactionEntry.querySelector('.secondAccountsRow').outerHTML : ''
                    obj.id = newId
                    obj.transactionType = newTransactionType
                    if (entryType !== 'transfer') obj.category = newCategoryField
                    if (entryType === 'transfer') obj.secAccountRow = newSecTransferRow
                    localStorage.setItem('transactions', JSON.stringify(transactionStorage))
                }
            })
            TAHistoryEntry.dataset.id = transactionEntry.id
            TAHistoryEntry.dataset.entryType = entryType
            TAHistoryEntry.querySelector('.balanceInfos').classList.replace(TAHistoryEntry.querySelector('.balanceInfos').classList[1], entryType + 'Entry')
            const TAEntryTag = TAHistoryEntry.querySelector('.tags')
            if (entryType === 'transfer') {
                if (!TAEntryTag.firstElementChild.classList.contains('transfer-tag')) {
                    const TAEntrySecAccountRow = transactionEntry.querySelector('.secondAccountsRow')
                    const accountsTag = TAEntryTag.querySelector('.accounts-tag')
                    TAEntryTag.removeChild(accountsTag)
                    const transferHTML = `
                    <span class="onlyBorderRadius transfer-tag">
                        <span class="tags-little accounts-tag" data-acc-id="${incomeActiveAccount.querySelector('.active').id}">${incomeActiveAccount.querySelector('.active').innerHTML}</span>
                        <i class="fa-solid fa-angle-right"></i>
                        <span class="tags-little accounts-tag" data-acc-id="${TAEntrySecAccountRow.querySelector('.active').firstElementChild.nextSibling.textContent}">${TAEntrySecAccountRow.querySelector('.active').innerHTML}</span>
                    </span>`
                    TAEntryTag.insertAdjacentHTML('afterbegin', transferHTML)
                }
            } else {
                if (TAEntryTag.firstElementChild.classList.contains('transfer-tag')) {
                    const incomeExpensesHTML = `
                    <span class="tags-little accounts-tag" data-acc-id="${incomeActiveAccount.querySelector('.active').id}">${incomeActiveAccount.querySelector('.active').innerHTML}</span>`
                    TAEntryTag.insertAdjacentHTML('afterbegin', incomeExpensesHTML)
                    const transferTag = TAEntryTag.querySelector('.transfer-tag')
                    TAEntryTag.removeChild(transferTag)
                }
            }
            console.log('neuer Transaction Type gespeichert');
        }
        
        if (transactionEntry.querySelector('.title').textContent !== incomeEntryClone.querySelector('.title').textContent) {
            TAHistoryEntry.querySelector('.title').firstElementChild.textContent = entryTitle.textContent
            transactionStorage.forEach(obj => {
                if (obj.id === transactionEntry.id) {
                    const newTitle = transactionEntry.querySelector('.title').outerHTML
                    obj.title = newTitle
                    localStorage.setItem('transactions', JSON.stringify(transactionStorage))
                }
            })
            console.log('neuer title gespeichert');
        }
        if (entryType !== 'transfer') {
            activeCatId = incomeCategory.dataset.catId
            CatTransactionHistory = document.querySelector(`.categorieEntryDetails[data-cat-id="${activeCatId}"] .transactionHistory`)
            if (transactionEntry.querySelector('.categoryField').innerHTML !== incomeEntryClone.querySelector('.categoryField').innerHTML) {
                TAHistoryEntry.querySelector('.category-tag').style.backgroundColor = incomeCategory.style.backgroundColor
                TAHistoryEntry.querySelector('.category-tag').innerHTML = `${incomeCategory.firstElementChild.outerHTML}${incomeCategory.textContent}`
                TAHistoryEntry.querySelector('.category-tag').dataset.catId = activeCatId
                const previousActiveCat = incomeEntryClone.querySelector('.categoryField')
                sumCategorieTotal(previousActiveCat.dataset.catId) 
                sumCategoriesThisMonthBalance(previousActiveCat.dataset.catId) 
                if (TAHistoryEntry.querySelector('.category-tag').textContent !== 'Add category') {
                    if (TAHistoryEntry.querySelector('.category-tag').classList.contains('noCategory')) TAHistoryEntry.querySelector('.category-tag').classList.toggle('noCategory');
                } else {
                    if (!TAHistoryEntry.querySelector('.category-tag').classList.contains('noCategory')) {
                        TAHistoryEntry.querySelector('.category-tag').classList.toggle('noCategory')
                    }
                }
                
                if (TAHistory.parentElement.parentElement.dataset.catId !== TAHistoryEntry.parentElement.parentElement.parentElement.parentElement.dataset.catId){
                    const TADate = new Date(transactionEntry.querySelector('#createdOn').value).getDate()
                    const TAHistoryEntryDateExistingDate = CatTransactionHistory.querySelector(`.balanceEntryDate[data-order="${TADate}."]`)
                    if (TAHistoryEntryDateExistingDate) {
                        if (TAHistoryEntry.parentElement.children.length <= 2){
                            const prevTAHistory = TAHistoryEntry.parentElement.parentElement
                            prevTAHistory.removeChild(TAHistoryEntry.parentElement)
                            TAHistoryEntryDateExistingDate.appendChild(TAHistoryEntry)        
                        } else {
                            const prevTAHistoryEntryParent = TAHistoryEntry.parentElement
                            TAHistoryEntryDateExistingDate.appendChild(TAHistoryEntry)
                            sumTransactionTotalAmount(prevTAHistoryEntryParent)
                        }
                    } else {
                        if (TAHistoryEntry.parentElement.children.length <= 2) {
                            CatTransactionHistory.appendChild(TAHistoryEntry.parentElement)
                        } else {
                            const TAEntryDate = document.createElement('div')
                            TAEntryDate.classList.add('balanceEntryDate')
                            TAEntryDate.dataset.order = inputDate
                            TAEntryDate.dataset.month = monthPicker(incomeDateMonth)
                
                            transactionHistoryEntryDateInnerHTML = `<div class="balanceEntryInfoTotal">
                                <div class="datum">
                                    <span class="monthAndDate">${monthAndDate}</span>
                                    <span class="dateDay">${dayPicker(incomeDateDay)}</span>
                                </div>
                                <div class="amount">
                                    <span>${incomeAddedAmount.textContent}</span>
                                    <span class="currency">CHF</span>
                                </div>
                            </div>`
                            TAEntryDate.insertAdjacentHTML('beforeend', transactionHistoryEntryDateInnerHTML)
                            const prevTAHistoryEntryParent = TAHistoryEntry.parentElement
                            CatTransactionHistory.appendChild(TAEntryDate)
                            TAEntryDate.appendChild(TAHistoryEntry)
                            sumTransactionTotalAmount(prevTAHistoryEntryParent)
                        }
                    }
                }

                transactionStorage.forEach(obj => {
                    if (obj.id === transactionEntry.id) {
                        const newCategory = transactionEntry.querySelector('.categoryField').outerHTML
                        obj.category = newCategory
                        localStorage.setItem('transactions', JSON.stringify(transactionStorage))
                    }
                })
                console.log('neuer CategoryField gespeichert');
            }
        }
        if (transactionEntry.querySelector('.description').innerHTML !== incomeEntryClone.querySelector('.description').innerHTML) {
            transactionStorage.forEach(obj => {
                if (obj.id === transactionEntry.id) {
                    const newDescription = transactionEntry.querySelector('.description').outerHTML
                    obj.description = newDescription
                    localStorage.setItem('transactions', JSON.stringify(transactionStorage))
                }
            })
            console.log('neuer Description gespeichert');
        }
        if (transactionEntry.querySelector('#createdOn').value !== incomeEntryClone.querySelector('#createdOn').value) {
            dateUpdater(TAHistory, TAHistoryEntryDate, TAHistoryEntry)
            let previousDate = new Date(incomeEntryClone.querySelector('#createdOn').value).getDate()
            if (TAHistory.querySelector(`[data-order="${previousDate}."]`)) sumTransactionTotalAmount(TAHistory.querySelector(`[data-order="${previousDate}."]`))
            transactionStorage.forEach(obj => {
                if (obj.id === transactionEntry.id) {
                    const newDate = transactionEntry.querySelector('#createdOn').value
                    obj.date = newDate
                    localStorage.setItem('transactions', JSON.stringify(transactionStorage))
                }
            })
            console.log('neuer DateInput gespeichert');
        }
        if (transactionEntry.querySelector('.addedAmount').textContent !== incomeEntryClone.querySelector('.addedAmount').textContent) {
            TAHistoryEntry.querySelector('.balanceInfos').querySelector('.amount').firstElementChild.lastChild.textContent = incomeAddedAmount.textContent
            transactionStorage.forEach(obj => {
                if (obj.id === transactionEntry.id) {
                    const newAmount = transactionEntry.querySelector('.addedAmount').outerHTML
                    obj.amount = newAmount
                    obj.amountSM = newAmount
                    localStorage.setItem('transactions', JSON.stringify(transactionStorage))
                }
            })
            console.log('neuer Added Amount gespeichert');
        }
        
        console.log('In ' + TAHistory.parentElement.parentElement.classList[0] + ' For ' + TAHistoryEntry.className + '-' + TAHistoryEntry.dataset.id + '-' + TAHistoryEntry.querySelector('.accounts-tag').dataset.accId + ' the Accounts Equality is ' + transactionEntry.querySelector('.accountsRow .active').isEqualNode(incomeEntryClone.querySelector('.accountsRow .active')));
        if (transactionEntry.querySelector('.accountsRow .active').isEqualNode(incomeEntryClone.querySelector('.accountsRow .active'))) {
            activeAccId = transactionEntry.querySelector('.accountsRow .active').id
            AccTransactionHistory = document.querySelector(`.accountEntryDetails[data-acc-id="${activeAccId}"] .transactionHistory`)
            if (entryType === 'transfer') {
                TAHistoryEntry.querySelector('.transfer-tag').firstElementChild.innerHTML = `${incomeActiveAccount.querySelector('.active').innerHTML}`
                TAHistoryEntry.querySelector('.transfer-tag').lastElementChild.innerHTML = `${TAEntrySecAccountRow.querySelector('.active').innerHTML}`
            } else {
                const activeAccId = incomeActiveAccount.querySelector('.active').id
                const AccTransactionHistory = document.querySelector(`.accountEntryDetails[data-acc-id="${activeAccId}"] .transactionHistory`)
                if (TAHistory.parentElement.parentElement === overviewMenu) {
                    TAHistoryEntry.querySelector('.accounts-tag').innerHTML = `${incomeActiveAccount.querySelector('.active').innerHTML}`
                    TAHistoryEntry.querySelector('.accounts-tag').dataset.accId = activeAccId
                } else if (TAHistoryEntry.querySelector(`.balanceEntry [data-acc-id]`).dataset.accId !== incomeActiveAccount.querySelector('.active').id) {
                    const TADate = new Date(transactionEntry.querySelector('#createdOn').value).getDate()
                    const TAHistoryEntryDateSameDate = AccTransactionHistory.querySelector(`.balanceEntryDate[data-order="${TADate}."]`)
                    if (TAHistory.parentElement.parentElement.dataset.accId === TAHistoryEntry.parentElement.parentElement.parentElement.parentElement.dataset.accId) {
                        TAHistoryEntry.querySelector('.accounts-tag').innerHTML = `${incomeActiveAccount.querySelector('.active').innerHTML}`
                        TAHistoryEntry.querySelector('.accounts-tag').dataset.accId = activeAccId
                        const previousActiveAcc = incomeEntryClone.querySelector('.accountsRow .active')
                        if (accountsMenu.querySelector(`[data-acc-id="${previousActiveAcc.id}"]`)) {
                            sumAccountTotal(previousActiveAcc.id) 
                            sumAccountsThisMonthBalance(previousActiveAcc.id) 
                        }
                    } else {
                        if (TAHistoryEntryDateSameDate) {
                            if (TAHistoryEntry.parentElement.children.length <= 2) {
                                const prevTAHistory = TAHistoryEntry.parentElement.parentElement
                                prevTAHistory.removeChild(TAHistoryEntry.parentElement)
                                TAHistoryEntryDateSameDate.appendChild(TAHistoryEntry)
                            } else {
                                const prevTAHistoryEntryParent = TAHistoryEntry.parentElement
                                TAHistoryEntryDateSameDate.appendChild(TAHistoryEntry)
                                sumTransactionTotalAmount(prevTAHistoryEntryParent)
                            }
                        } else {
                            if (TAHistoryEntry.parentElement.children.length <= 2) {
                                AccTransactionHistory.appendChild(TAHistoryEntry.parentElement)
                            } else {
                                const TAEntryDate = document.createElement('div')
                                TAEntryDate.classList.add('balanceEntryDate')
                                TAEntryDate.dataset.order = inputDate
                                TAEntryDate.dataset.month = monthPicker(incomeDateMonth)
                    
                                transactionHistoryEntryDateInnerHTML = `<div class="balanceEntryInfoTotal">
                                    <div class="datum">
                                        <span class="monthAndDate">${monthAndDate}</span>
                                        <span class="dateDay">${dayPicker(incomeDateDay)}</span>
                                    </div>
                                    <div class="amount">
                                        <span>${incomeAddedAmount.textContent}</span>
                                        <span class="currency">CHF</span>
                                    </div>
                                </div>`
                                TAEntryDate.insertAdjacentHTML('beforeend', transactionHistoryEntryDateInnerHTML)
                                const prevTAHistoryEntryParent = TAHistoryEntry.parentElement
                                AccTransactionHistory.appendChild(TAEntryDate)
                                TAEntryDate.appendChild(TAHistoryEntry)
                                sumTransactionTotalAmount(prevTAHistoryEntryParent)
                            }
                        }
                        TAHistoryEntry.querySelector('.accounts-tag').innerHTML = `${incomeActiveAccount.querySelector('.active').innerHTML}`
                        TAHistoryEntry.querySelector('.accounts-tag').dataset.accId = activeAccId
                        const previousActiveAcc = incomeEntryClone.querySelector('.accountsRow .active')
                        sumAccountTotal(previousActiveAcc.id) 
                        sumAccountsThisMonthBalance(previousActiveAcc.id) 
                    }
                }
                transactionStorage.forEach(obj => {
                    if (obj.id === transactionEntry.id) {
                        const newAccountRow = transactionEntry.querySelector('.accountsRow').outerHTML
                        obj.accountRow = newAccountRow
                        localStorage.setItem('transactions', JSON.stringify(transactionStorage))
                    }
                })
                console.log('Account angepasst');
            }
        }
        if (entryType === 'transfer') {
            activeTransferAccId = transactionHistoryEntry.querySelector('.transfer-tag').lastElementChild.dataset.accId
            transferAccTransactionHistory = document.querySelector(`.accountEntryDetails[data-acc-id="${activeTransferAccId}"] .transactionHistory`)
            if (transactionEntry.querySelector('.secondAccountsRow .active') !== incomeEntryClone.querySelector('.secondAccountsRow .active')) {
                const TAEntrySecAccountRow = transactionEntry.querySelector('.secondAccountsRow')
                TAHistoryEntry.querySelector('.transfer-tag').firstElementChild.innerHTML = `${incomeActiveAccount.querySelector('.active').innerHTML}`
                TAHistoryEntry.querySelector('.transfer-tag').lastElementChild.innerHTML = `${TAEntrySecAccountRow.querySelector('.active').innerHTML}`
                transactionStorage.forEach(obj => {
                    if (obj.id === transactionEntry.id) {
                        const newTransferRow = transactionEntry.querySelector('.secondAccountsRow').outerHTML
                        obj.secAccountRow = newTransferRow
                        localStorage.setItem('transactions', JSON.stringify(transactionStorage))
                    }
                })
            }
            console.log('TransferRow Account angepasst');
        }

        
        
        console.log('Neue Änderungen gespeichert ' + savedCounter);
        savedCounter++

        if (!TAHistoryEntry.parentElement) dateChecker(TAHistory, TAHistoryEntry, TAHistoryEntryDate)
        sortTransactionOrder(TAHistory)
        sumTransactionTotalAmount(TAHistoryEntry.parentElement)
        setTransactionOverview(overviewMenu)
        const allTagEntryDetails = document.querySelectorAll('.tagDetails')
        allTagEntryDetails.forEach(tagMenu => {
            setTransactionOverview(tagMenu)
            sumAccountsIncomeAndExpensesAmount(tagMenu)
        })
        sumCashflowTotalAmount()
        sumIncomeAndExpensesTotalAmount()
        sumAccountTotal(incomeActiveAccount.querySelector('.active').id)
        sumAccountsThisMonthBalance(incomeActiveAccount.querySelector('.active').id)
        if (entryType === 'transfer') {
            const TAEntrySecAccountRow = transactionEntry.querySelector('.secondAccountsRow')
            sumAccountTotal(TAEntrySecAccountRow.querySelector('.active').textContent)
            sumAccountsThisMonthBalance(TAEntrySecAccountRow.querySelector('.active').textContent)
        }
        if (CatTransactionHistory) {
            sumCategorieTotal(incomeCategory.dataset.catId)
            sumCategoriesThisMonthBalance(incomeCategory.dataset.catId)
        }
        sumCurrentAccountBalance()
        sumCategoriesIncomeAndExpensesAmount()
        checkTransactionHistoryIsEmpty()
        
        if (CatTransactionHistory) {
            if (TAHistoryEntry !== transactionHistoryEntryCatClone) return
        } else if (transferAccTransactionHistory) {
            if (TAHistoryEntry !== transactionHistoryEntryTransferAcc) return
        } else {
            if (TAHistoryEntry !== transactionHistoryEntryClone) return
        }
        incomeEntryClone = transactionEntry.cloneNode(true)
        const latestEntrySavePoint = incomeEntryClone.cloneNode(true)
        savedCounter = 1
        console.log('Transaktion änderung gespeichert');
    }

    function closeEditedEntry() {
        checkEntryType()
        
        if (transactionEntry.querySelector('.setTransaction')) {
            if (transactionEntry.querySelector('.setTransaction').className !== incomeEntryClone.querySelector('.setTransaction').className) transactionEntry.querySelector('.setTransaction.hidden').classList.toggle('hidden')
            if (transactionEntry.querySelector('.setTransaction').textContent !== incomeEntryClone.querySelector('.setTransaction').textContent) {
                transactionEntry.querySelector('.setTransaction').textContent = incomeEntryClone.querySelector('.setTransaction').textContent
                transactionEntry.id = incomeEntryClone.id
                transactionEntry.classList = incomeEntryClone.classList
                if (!transactionEntry.classList.contains('active')) transactionEntry.classList.toggle('active')
                if (!transactionEntry.querySelector('.categoryField')) {
                    const categoryFieldClone = incomeEntryClone.querySelector('.categoryField').cloneNode(true)
                    transactionEntry.querySelector('.entryDetailBody').insertBefore(categoryFieldClone, transactionEntry.querySelector('.description'))
                    transactionEntry.querySelector('.categoryField').innerHTML = incomeEntryClone.querySelector('.categoryField').innerHTML
                    transactionEntry.querySelector('.categoryField').addEventListener('click', (e) => {
                        chooseCategoryMenu.classList.toggle('active')
                        overlay.classList.toggle('active')
                        const incomeCategoryInsideCategoriesRow = chooseCategoryMenu.querySelector('.categoriesRow').querySelector('#' + e.target.textContent)
                        if (!incomeCategoryInsideCategoriesRow) return
                        refreshCategoryRow()
                        incomeCategoryInsideCategoriesRow.insertAdjacentHTML("beforeend", minusIconHTML)
                        incomeCategoryInsideCategoriesRow.classList.toggle('active')
                    })
                }
                if (transactionEntry.querySelector('.secondAccountsRow')) {
                    const actionBottomMenu = transactionEntry.querySelector('.actionBottomMenu')
                    actionBottomMenu.querySelector('h3').textContent = incomeEntryClone.querySelector('h3').textContent
                    actionBottomMenu.removeChild(actionBottomMenu.querySelector('.secondAccountsRow'))
                    actionBottomMenu.removeChild(actionBottomMenu.querySelectorAll('h3')[1])
                }
                checkEntryType()
                console.log('SetTransaction Button zurückgesetzt');
            }
        }

        if (transactionEntry.querySelector('.title').textContent !== incomeEntryClone.querySelector('.title').textContent) {
            transactionEntry.querySelector('.title').textContent = incomeEntryClone.querySelector('.title').textContent
            console.log('Title zurückgesetzt');
        }
        if (entryType !== 'transfer') {
            if (transactionEntry.querySelector('.categoryField').innerHTML !== incomeEntryClone.querySelector('.categoryField').innerHTML) {
                if (!incomeEntryClone.querySelector('.categoryField').childNodes[2]) {
                    refreshCategoryTag()
                    refreshCategoryRow()
                    console.log('-> Vorher keine Category ausgewählt');
                } else {
                    addCategory(chooseCategoryMenu.querySelector('.categoriesRow').querySelector('#' + incomeEntryClone.querySelector('.categoryField').textContent))
                    chooseCategoryMenu.classList.toggle('active')
                    overlay.classList.toggle('active')
                    console.log('-> Wieder alte Category ausgewählt');
                }
                console.log('CategoryField zurückgesetzt');
            }
        }
        if (transactionEntry.querySelector('.description').innerHTML !== incomeEntryClone.querySelector('.description').innerHTML) {
            transactionEntry.querySelector('.description').innerHTML = incomeEntryClone.querySelector('.description').innerHTML
            console.log('Description zurückgesetzt');
        }
        if (transactionEntry.querySelector('#createdOn').value !== incomeEntryClone.querySelector('#createdOn').value) {
            transactionEntry.querySelector('#createdOn').value = incomeEntryClone.querySelector('#createdOn').value
            console.log('DateInput zurückgesetzt');
        }
        if (transactionEntry.querySelector('.addedAmount').textContent !== incomeEntryClone.querySelector('.addedAmount').textContent) {
            transactionEntry.querySelector('.addedAmount').textContent = incomeEntryClone.querySelector('.addedAmount').textContent
            console.log('Added Amount zurückgesetzt');
        }
        if (IncomeAccountRow.querySelector('.active').innerHTML !== incomeEntryClone.querySelector('.accountsRow').querySelector('.active').innerHTML) {
            refreshAccountRow()
            const incomeEntryCloneActiveAcc = incomeEntryClone.querySelector('.accountsRow').querySelector('.active')
            const accsSameID = document.querySelectorAll('#' + incomeEntryCloneActiveAcc.id)
            accsSameID.forEach(acc => addAccounts(acc, acc.firstElementChild.style.backgroundColor))
            
            console.log('Aktiver Account zurückgesetzt');
        }
        if (entryType === 'transfer') {
            const TAEntrySecAccountRow = transactionEntry.querySelector('.secondAccountsRow')
            if (TAEntrySecAccountRow.querySelector('.active').innerHTML !== incomeEntryClone.querySelector('.secondAccountsRow').querySelector('.active').innerHTML) {
                const incomeEntryCloneActiveSecAcc = incomeEntryClone.querySelector('.secondAccountsRow').querySelector('.active')
                let prevSelectedTransferAcc
                Array.from(TAEntrySecAccountRow.children).forEach(child => {
                    while (incomeEntryCloneActiveSecAcc.textContent === child.textContent) {
                        prevSelectedTransferAcc = child
                        break;
                    }
                })

                if (TAEntrySecAccountRow.querySelector('.active')) {
                    TAEntrySecAccountRow.querySelector('.active').style.backgroundColor = ''
                    TAEntrySecAccountRow.querySelector('.active').classList.toggle('active')
                }
                addAccounts(prevSelectedTransferAcc, prevSelectedTransferAcc.firstElementChild.style.backgroundColor)
                
                console.log('Aktiver Transfer Second Account zurückgesetzt');
            }
        }
        console.log('Daten wurden zurückgesetzt');
    }

    let incomeDateMonth = new Date(incomeDate.value).getMonth()
    let incomeDateDay = new Date(incomeDate.value).getDay()
    
    let monthAndDate = `${monthPicker(incomeDateMonth)} ${new Date(incomeDate.value).getDate()}.`
    let inputDate = `${new Date(incomeDate.value).getDate()}.`
    
    const transactionHistory = overviewMenu.querySelector('.transactionHistory')

    const transactionHistoryEntryDate = document.createElement('div')
    transactionHistoryEntryDate.classList.add('balanceEntryDate')
    transactionHistoryEntryDate.dataset.order = inputDate
    transactionHistoryEntryDate.dataset.month = monthPicker(incomeDateMonth)

    const transactionHistoryEntry = document.createElement('div')
    transactionHistoryEntry.classList.add('balanceEntry')
    transactionHistoryEntry.dataset.order = inputDate
    transactionHistoryEntry.dataset.month = monthPicker(incomeDateMonth)
    transactionHistoryEntry.dataset.id = transactionEntry.id
    transactionHistoryEntry.dataset.entryType = transactionType

    const transactionHistoryEntryDateInnerHTML = `<div class="balanceEntryInfoTotal">
        <div class="datum">
            <span class="monthAndDate">${monthAndDate}</span>
            <span class="dateDay">${dayPicker(incomeDateDay)}</span>
        </div>
        <div class="amount">
            <span>${incomeAddedAmount.textContent}</span>
            <span class="currency">CHF</span>
        </div>
    </div>`
    transactionHistoryEntryDate.insertAdjacentHTML('beforeend', transactionHistoryEntryDateInnerHTML)
  
    if (transactionType !== 'transfer') {
      const transactionHistoryEntryInnerHTML = `<div class="balanceInfos ${transactionType}Entry box">
        <div class="tags">
            <span class="tags-little category-tag" data-cat-id="${incomeCategory.dataset.catId}" style="background-color: ${incomeCategory.style.backgroundColor};">${incomeCategory.firstElementChild.outerHTML}${incomeCategory.textContent}</span>
            <span class="tags-little accounts-tag" data-acc-id="${incomeActiveAccount.querySelector('.active').id}">${incomeActiveAccount.querySelector('.active').innerHTML}</span>
        </div>
        <div class="title">
            <span>${entryTitle.textContent}</span>
        </div>
        <div class="amount">
          <span><i class="fa-solid ${entryTypeIcon}"></i>${incomeAddedAmount.textContent}</span>
          <span class="currency">CHF</span>
        </div>
      </div>`
      transactionHistoryEntry.insertAdjacentHTML('beforeend', transactionHistoryEntryInnerHTML)
    } else {
        const transactionHistoryEntryInnerHTML = `<div class="balanceInfos ${transactionType}Entry box">
        <div class="tags">
            <span class="onlyBorderRadius transfer-tag">
                <span class="tags-little accounts-tag" data-acc-id="${incomeActiveAccount.querySelector('.active').id}">${incomeActiveAccount.querySelector('.active').innerHTML}</span>
                <i class="fa-solid fa-angle-right"></i>
                <span class="tags-little accounts-tag" data-acc-id="${TAEntrySecAccountRow.querySelector('.active').firstElementChild.nextSibling.textContent}">${TAEntrySecAccountRow.querySelector('.active').innerHTML}</span>
            </span>
        </div>
        <div class="title">
            <span>${entryTitle.textContent}</span>
        </div>
        <div class="amount">
          <span><i class="fa-solid ${entryTypeIcon}"></i>${incomeAddedAmount.textContent}</span>
          <span class="currency">CHF</span>
        </div>
      </div>`
      transactionHistoryEntry.insertAdjacentHTML('beforeend', transactionHistoryEntryInnerHTML)
    }
    

    transactionHistoryEntry.addEventListener('click', () => {
        prevOverview(overviewMenu)
        transactionEntry.classList.toggle('active')
        refreshAccountRow()
        const incomeEntryActiveAcc = transactionHistoryEntry.querySelector('.accounts-tag')
        const accsSameID = document.querySelectorAll('#' + incomeEntryActiveAcc.firstElementChild.nextSibling.textContent)
        accsSameID.forEach(acc => addAccounts(acc, acc.firstElementChild.style.backgroundColor))
    })

    transactionHistoryEntry.querySelector('.accounts-tag').addEventListener('click', (e) => {
        e.stopPropagation()
        const targetAcccountEntryDetails = document.querySelector(`.accountEntryDetails[data-acc-id="${e.target.dataset.accId}"]`)
        const targetParentMenu = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
        targetAcccountEntryDetails.classList.toggle('active')
        prevPage(targetParentMenu)
    })

    if (transactionType !== 'transfer') {
        transactionHistoryEntry.querySelector('.category-tag').addEventListener('click', (e) => {
            e.stopPropagation()
            const targetCategoryEntryDetails = document.querySelector(`.tagDetails[data-cat-id="${e.target.dataset.catId}"]`)
            const targetParentMenu = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
            targetCategoryEntryDetails.classList.toggle('active')
            prevPage(targetParentMenu)
        })
    }
    
    function checkCategoryAvailability() {
        if (transactionHistoryEntry.querySelector('.category-tag').textContent !== 'Add category') return
        transactionHistoryEntry.querySelector('.category-tag').classList.toggle('noCategory')
        transactionHistoryEntry.querySelector('.category-tag').dataset.catId = 'noCategory'
        transactionHistoryEntry.querySelector('.category-tag').style.backgroundColor = 'var(--grey1)'
    }
    if (transactionType !== 'transfer') checkCategoryAvailability()

    function dateChecker(TAHistory, TAEntry, TAEntryDate) {
        if (!TAHistory.querySelector('.balanceEntryDate')) {
            TAHistory.appendChild(TAEntryDate)
            TAEntryDate.appendChild(TAEntry)
            orderCounter = inputDate
            TAEntryDate.dataset.order = inputDate
            TAEntry.dataset.order = inputDate
        } else {
            let dateExisting
            TAHistory.querySelectorAll('.monthAndDate').forEach(inputDate => {
                if (monthAndDate === inputDate.textContent) dateExisting = true
            })
            if (dateExisting) {
                const referenzNode = inputDate
                let referenzDate = referenzNode.slice(0, 2)
                referenzDate++
                TAHistory.querySelector(`[data-order="${inputDate}"]`).appendChild(TAEntry)
            } else {
                TAHistory.appendChild(TAEntryDate)
                TAEntryDate.appendChild(TAEntry)
                orderCounter = inputDate
                TAEntryDate.dataset.order = inputDate
            }
        }
    }
    
    function dateUpdater(TAHistory, TAEntryDate, TAEntry) {
        incomeDateMonth = new Date(incomeDate.value).getMonth()
        monthAndDate = `${monthPicker(incomeDateMonth)} ${new Date(incomeDate.value).getDate()}.`
        inputDate = `${new Date(incomeDate.value).getDate()}.`
        
        let dateExisting
        TAHistory.querySelectorAll('.monthAndDate').forEach(inputDate => {
            if (monthAndDate === inputDate.textContent) dateExisting = true
        })
        if (dateExisting) {
            const newDate = `${new Date(incomeDate.value).getDate()}.`
            referenzDate++
            
            if (TAEntry.parentElement.children.length <= 2) {
                const prevTAHistory = TAEntry.parentElement.parentElement
                prevTAHistory.removeChild(TAEntry.parentElement)
            }
            TAHistory.querySelector(`[data-order="${newDate}"]`).appendChild(TAEntry)
            TAEntryDate.dataset.order = newDate
            TAEntry.dataset.order = newDate
            TAEntry.dataset.month = monthPicker(incomeDateMonth)
        } else {
            if (TAEntry.parentElement.children.length <= 2) {
                const prevTAHistory = TAEntry.parentElement.parentElement
                prevTAHistory.removeChild(TAEntry.parentElement)
            }
            const TAEntryDate = document.createElement('div')
            TAEntryDate.classList.add('balanceEntryDate')
            TAEntryDate.dataset.order = inputDate

            const transactionHistoryEntryDateInnerHTML = `<div class="balanceEntryInfoTotal">
                <div class="datum">
                    <span class="monthAndDate">${monthAndDate}</span>
                    <span class="dateDay">${dayPicker(incomeDateDay)}</span>
                </div>
                <div class="amount">
                    <span>${incomeAddedAmount.textContent}</span>
                    <span class="currency">CHF</span>
                </div>
            </div>`
            TAEntryDate.insertAdjacentHTML('beforeend', transactionHistoryEntryDateInnerHTML)

            TAHistory.appendChild(TAEntryDate)
            TAEntryDate.appendChild(TAEntry)
            TAEntryDate.querySelector('.monthAndDate').innerHTML = `${monthPicker(incomeDateMonth)} ${new Date(incomeDate.value).getDate()}.`
            TAEntryDate.dataset.order = inputDate
            TAEntryDate.dataset.month = monthPicker(incomeDateMonth)
            TAEntry.dataset.order = inputDate
            TAEntry.dataset.month = monthPicker(incomeDateMonth)
        }
    }

    let activeAccId
    let activeCatId
    activeAccId = transactionHistoryEntry.querySelector('.accounts-tag').dataset.accId
    let AccTransactionHistory = document.querySelector(`.accountEntryDetails[data-acc-id="${activeAccId}"] .transactionHistory`)
    let CatTransactionHistory
    if (transactionType !== 'transfer') {
        if (incomeCategory.dataset.catId === 'noCategory') return
        activeCatId = incomeCategory.dataset.catId
        CatTransactionHistory = document.querySelector(`.categorieEntryDetails[data-cat-id="${activeCatId}"] .transactionHistory`)
    }
    let activeTransferAccId
    let transferAccTransactionHistory
    if (transactionType === 'transfer') {
        activeTransferAccId = transactionHistoryEntry.querySelector('.transfer-tag').lastElementChild.dataset.accId
        transferAccTransactionHistory = document.querySelector(`.accountEntryDetails[data-acc-id="${activeTransferAccId}"] .transactionHistory`)
    }
    const transactionHistoryEntryDateClone = transactionHistoryEntryDate.cloneNode(true)
    const transactionHistoryEntryClone = transactionHistoryEntry.cloneNode(true)
    transactionHistoryEntryClone.addEventListener('click', () => {
        const incomeEntryActiveAcc = transactionHistoryEntryClone.querySelector('.accounts-tag')
        const accEntryDetails = document.querySelector(`.accountEntryDetails[data-acc-id="${incomeEntryActiveAcc.dataset.accId}"]`)
        prevOverview(accEntryDetails)
        transactionEntry.classList.toggle('active')
        refreshAccountRow()
        const accsSameID = document.querySelectorAll('#' + incomeEntryActiveAcc.firstElementChild.nextSibling.textContent)
        accsSameID.forEach(acc => addAccounts(acc, acc.firstElementChild.style.backgroundColor))
    })

    if (transactionType !== 'transfer') {
        transactionHistoryEntryClone.querySelector('.category-tag').addEventListener('click', (e) => {
            e.stopPropagation()
            const targetCategoryEntryDetails = document.querySelector(`.tagDetails[data-cat-id="${e.target.dataset.catId}"]`)
            const targetParentMenu = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
            targetCategoryEntryDetails.classList.toggle('active')
            prevPage(targetParentMenu)
        })
    }

    const transactionHistoryEntryDateCatClone = transactionHistoryEntryDate.cloneNode(true)
    const transactionHistoryEntryCatClone = transactionHistoryEntry.cloneNode(true)
    transactionHistoryEntryCatClone.addEventListener('click', () => {
        const tagEntryDetails = document.querySelector(`.tagDetails[data-cat-id="${activeCatId}"]`)
        prevOverview(tagEntryDetails)
        transactionEntry.classList.toggle('active')
    })

    transactionHistoryEntryCatClone.querySelector('.accounts-tag').addEventListener('click', (e) => {
        e.stopPropagation()
        const targetAcccountEntryDetails = document.querySelector(`.accountEntryDetails[data-acc-id="${e.target.dataset.accId}"]`)
        const targetParentMenu = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
        targetAcccountEntryDetails.classList.toggle('active')
        prevPage(targetParentMenu)
    })

    const transactionHistoryEntryDateTransferAcc = transactionHistoryEntryDate.cloneNode(true)
    const transactionHistoryEntryTransferAcc = transactionHistoryEntry.cloneNode(true)
    transactionHistoryEntryTransferAcc.addEventListener('click', () => {
        const accEntryDetails = document.querySelector(`.accountEntryDetails[data-acc-id="${activeTransferAccId}"]`)
        prevOverview(accEntryDetails)
        transactionEntry.classList.toggle('active')
        refreshAccountRow()
        const incomeEntryActiveAcc = transactionHistoryEntryTransferAcc.querySelector('.accounts-tag')
        const accsSameID = document.querySelectorAll('#' + incomeEntryActiveAcc.firstElementChild.nextSibling.textContent)
        accsSameID.forEach(acc => addAccounts(acc, acc.firstElementChild.style.backgroundColor))
    })

    
    function sortTransactionOrder(menü) {
        let orderArray = []
        menü.querySelectorAll('.balanceEntryDate').forEach(entry => {
            if (entry.dataset.order !== undefined) {
                orderArray.push(entry)
            }
        })
        
        orderArray.forEach(TA => {
            if (TA.dataset.month.length <= 2) return
            let TAMonthInNumber = Object.keys(monthsNameInNumbers).indexOf(TA.dataset.month)
            TA.dataset.month = TAMonthInNumber
        })
        
        orderArray.sort((a, b) => {
            return a.dataset.month - b.dataset.month
        })
        
        orderArray.sort((a, b) => {
            if (a.dataset.month !== b.dataset.month) return
            return a.dataset.order - b.dataset.order
        })
        
        orderArray.forEach(TA => TA.dataset.month = monthPicker(+TA.dataset.month))
        orderArray.forEach(entry => menü.appendChild(entry))
    }
    
    dateChecker(transactionHistory, transactionHistoryEntry, transactionHistoryEntryDate)
    dateChecker(AccTransactionHistory, transactionHistoryEntryClone, transactionHistoryEntryDateClone)
    if (transactionType === 'transfer') {
        dateChecker(transferAccTransactionHistory, transactionHistoryEntryTransferAcc, transactionHistoryEntryDateTransferAcc)
        sortTransactionOrder(transferAccTransactionHistory)
        sumTransactionTotalAmount(transactionHistoryEntryTransferAcc.parentElement)
        sumAccountTotal(TAEntrySecAccountRow.querySelector('.active').textContent)
        sumAccountsThisMonthBalance(TAEntrySecAccountRow.querySelector('.active').textContent)
    }
    if (CatTransactionHistory) {
        dateChecker(CatTransactionHistory, transactionHistoryEntryCatClone, transactionHistoryEntryDateCatClone)
        sumTransactionTotalAmount(transactionHistoryEntryCatClone.parentElement);
    }
    sortTransactionOrder(transactionHistory)
    sortTransactionOrder(AccTransactionHistory)
    sumTransactionTotalAmount(transactionHistoryEntry.parentElement)
    sumTransactionTotalAmount(transactionHistoryEntryClone.parentElement);
    setTransactionOverview(overviewMenu)
    const allTagEntryDetails = document.querySelectorAll('.tagDetails')
    allTagEntryDetails.forEach(tagMenu => {
        setTransactionOverview(tagMenu)
        sumAccountsIncomeAndExpensesAmount(tagMenu)
    })
    sumCashflowTotalAmount()
    sumIncomeAndExpensesTotalAmount()
    if (CatTransactionHistory) {
        sumCategorieTotal(incomeCategory.dataset.catId)
        sumCategoriesThisMonthBalance(incomeCategory.dataset.catId)
    }
    sumAccountTotal(incomeActiveAccount.querySelector('.active').id)
    sumAccountsThisMonthBalance(incomeActiveAccount.querySelector('.active').id)
    sumCurrentAccountBalance()
    sumCategoriesIncomeAndExpensesAmount()
    checkTransactionHistoryIsEmpty()
}

let prevPageArr = []
function prevPage(menu) {
    prevPageArr.unshift(menu)
    prevPageArr[0].classList.toggle('active')
}

function sumTransactionTotalAmount(entrysParent) {
    let amountTotal = 0.00
    Array.from(entrysParent.children).forEach(child => {
        if (!child.classList.contains('balanceEntry')) return
        if (child.dataset.entryType === 'income') {
            amountTotal += +child.querySelector('.amount').firstElementChild.textContent
        }
        if (child.dataset.entryType === 'expenses') {
            amountTotal -= +child.querySelector('.amount').firstElementChild.textContent
        }
    })
    entrysParent.firstElementChild.querySelector('.amount').firstElementChild.textContent = Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amountTotal)
}

function sumCashflowTotalAmount() {
    let cashflowTotal = 0.00
    const cashflowAmount = overviewMenu.querySelector('.cashflowAmount')
    const allTransactions = overviewMenu.querySelectorAll('.balanceEntryDate')
    allTransactions.forEach(transaction => {
        if (!transaction.classList.contains('notDisplayed')) cashflowTotal += +transaction.querySelector('.amount').firstElementChild.textContent
    })
    let positivSign = ''
    if (cashflowTotal.toString().charAt(0) !== '-') positivSign = '+'
    cashflowAmount.textContent = positivSign + Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(cashflowTotal)
    if (cashflowAmount.textContent.charAt(0) === '-') {
        overviewMenu.querySelector('.cashflow').classList.add('negativCashflow')
    } else {
        overviewMenu.querySelector('.cashflow').classList.remove('negativCashflow')
    }
}

function sumIncomeAndExpensesTotalAmount() {
    let incomeTotal = 0.00
    let expensesTotal = 0.00
    const incomeTotalAmount = overviewMenu.querySelector('.incomeTotal')
    const expensesTotalAmount = overviewMenu.querySelector('.expensesTotal')
    const incomeMenuTotalAmount = incomeMenu.querySelector('.incomeTotal .amount')
    const expensesMenuTotalAmount = expensesMenu.querySelector('.expensesTotal .amount')
    const allTransactions = overviewMenu.querySelectorAll('.balanceEntryDate')
    allTransactions.forEach(transaction => {
        if (transaction.classList.contains('notDisplayed')) return
        Array.from(transaction.children).forEach(child => {
            if (child.dataset.entryType === 'income') {
                incomeTotal += +child.querySelector('.amount').firstElementChild.textContent
            }
            if (child.dataset.entryType === 'expenses') {
                expensesTotal += +child.querySelector('.amount').firstElementChild.textContent
            }
        })
    })

    incomeTotalAmount.textContent = Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(incomeTotal)
    expensesTotalAmount.textContent = Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(expensesTotal)
    incomeMenuTotalAmount.textContent = Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(incomeTotal)
    expensesMenuTotalAmount.textContent = Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(expensesTotal)
}

function monthPicker(dateMonth) {
    switch (dateMonth) {
        case 0:
            dateMonth = 'Januar'
            break
        case 1:
            dateMonth = 'Februar'
            break
        case 2:
            dateMonth = 'März'
            break
        case 3:
            dateMonth = 'April'
            break
        case 4:
            dateMonth = 'Mai'
            break
        case 5:
            dateMonth = 'Juni'
            break
        case 6:
            dateMonth = 'Juli'
            break
        case 7:
            dateMonth = 'August'
            break
        case 8:
            dateMonth = 'September'
            break
        case 9:
            dateMonth = 'Oktober'
            break
        case 10:
            dateMonth = 'November'
            break
        case 11:
            dateMonth = 'Dezember'
            break
    }
    return dateMonth
}

function dayPicker(dateDay) {
    switch (dateDay) {
        case 0:
            dateDay = 'Sontag'
            break
        case 1:
            dateDay = 'Montag'
            break
        case 2:
            dateDay = 'Dienstag'
            break
        case 3:
            dateDay = 'Mittwoch'
            break
        case 4:
            dateDay = 'Donnerstag'
            break
        case 5:
            dateDay = 'Freitag'
            break
        case 6:
            dateDay = 'Samstag'
            break
    }
    return dateDay
}

let prevOverviewEl
function prevOverview(menü) {
    menü.classList.toggle('active')
    prevOverviewEl = menü
}


////////////////////////////////////////////////////////////////  Set transaction type Menu  ///////////////////////////////////////////////////////////////////


const transactionTypeMenu = document.querySelector('.setTransactionMenu')

transactionTypeMenu.querySelectorAll('span.box').forEach(span => {
    span.addEventListener('click', () => {
        if (span.textContent == 'Income') {
            transactionTypeMenu.classList.toggle('active')
            overlay.classList.toggle('active')
            if (span.querySelector('active')) return
            if (document.querySelector('.entryDetail.active').classList[0].includes('new')) {
                document.querySelector('.entryDetail.active').classList.toggle('active')
                newIncomeEntryPage.classList.toggle('active')
            } else {
                const activeEntryDetail = document.querySelector('.entryDetail.active')
                activeEntryDetail.classList.replace('expensesEntryPage', 'incomeEntryPage')
                activeEntryDetail.querySelector('.setTransaction').textContent = 'Income'
                const newIncomeActiveEntryDetailId = 'income' + activeEntryDetail.id.slice(8)
                activeEntryDetail.id = newIncomeActiveEntryDetailId
                if (activeEntryDetail.querySelector('.title').dataset.placeholder.startsWith('Expenses')) activeEntryDetail.querySelector('.title').dataset.placeholder = 'Income Title'
                checkEntryType()
            }
        } else if (span.textContent == 'Expenses') {
            transactionTypeMenu.classList.toggle('active')
            overlay.classList.toggle('active')
            if (span.querySelector('active')) return
            if (document.querySelector('.entryDetail.active').classList[0].includes('new')) {
                document.querySelector('.entryDetail.active').classList.toggle('active')
                newExpensesEntryPage.classList.toggle('active')
            } else {
                const activeEntryDetail = document.querySelector('.entryDetail.active')
                activeEntryDetail.classList.replace('incomeEntryPage', 'expensesEntryPage')
                activeEntryDetail.querySelector('.setTransaction').textContent = 'Expenses'
                const newExpensesActiveEntryDetailId = 'expenses' + activeEntryDetail.id.slice(6)
                activeEntryDetail.id = newExpensesActiveEntryDetailId
                if (activeEntryDetail.querySelector('.title').dataset.placeholder.startsWith('Income')) activeEntryDetail.querySelector('.title').dataset.placeholder = 'Expenses Title'
                checkEntryType()
            }
        } else if (span.textContent == 'Transfer') {
            transactionTypeMenu.classList.toggle('active')
            overlay.classList.toggle('active')
            if (span.querySelector('active')) return
            checkEntryType()
            if (document.querySelector('.entryDetail.active').classList[0].includes('new')) {
                document.querySelector('.entryDetail.active').classList.toggle('active')
                newTransferEntryPage.classList.toggle('active')
            } else {
                const activeEntryDetail = document.querySelector('.entryDetail.active')
                activeEntryDetail.querySelector('.setTransaction').textContent = 'Transfer'
                activeEntryDetail.querySelector('.setTransaction').classList.toggle('hidden')
                activeEntryDetail.querySelector('.title').dataset.placeholder = 'Transfer Title'
                activeEntryDetail.querySelector('.entryDetailBody').removeChild(activeEntryDetail.querySelector('.categoryField'))
                if (entryType === 'income') {
                    activeEntryDetail.classList.replace('incomeEntryPage', 'transferEntryPage')
                    const newTransferActiveEntryDetailId = 'transfer' + activeEntryDetail.id.slice(6)
                    activeEntryDetail.id = newTransferActiveEntryDetailId  
                } else if (entryType === 'expenses') {
                    activeEntryDetail.classList.replace('expensesEntryPage', 'transferEntryPage')
                    const newTransferActiveEntryDetailId = 'transfer' + activeEntryDetail.id.slice(8)
                    activeEntryDetail.id = newTransferActiveEntryDetailId
                }
                const activeEntryBottomMenu =  activeEntryDetail.querySelector('.actionBottomMenu')
                activeEntryBottomMenu.querySelector('h3').textContent = 'From'
                const newSpan = document.createElement('h3')
                newSpan.textContent = 'To'
                activeEntryBottomMenu.insertBefore(newSpan, activeEntryDetail.querySelector('.amount'))
                const transferSecRowClone = newTransferEntryPage.querySelector('.secondAccountsRow').cloneNode(true)
                activeEntryBottomMenu.insertBefore(transferSecRowClone, activeEntryDetail.querySelector('.amount'))
                const newTransferSecAccRow = activeEntryDetail.querySelector('.secondAccountsRow')
        
                Array.from(newTransferSecAccRow.children).forEach(child => {
                    child.addEventListener('click', () => {
                        if (newTransferSecAccRow.querySelector('.active')) {
                            newTransferSecAccRow.querySelector('.active').style.backgroundColor = ''
                            newTransferSecAccRow.querySelector('.active').classList.toggle('active')
                        }
                        addAccounts(child, child.firstElementChild.style.backgroundColor)
                    })
                })    
                checkEntryType()    
            }
        }
        refreshTransactionRow()
    })
})

function refreshTransactionRow() {
    const activeTransactionType = transactionTypeMenu.querySelectorAll('.active')
    activeTransactionType.forEach(activated => {
        activated.classList.toggle('active');
    })
}

transactionTypeMenu.lastElementChild.firstElementChild.addEventListener('click', () => {
    transactionTypeMenu.classList.toggle('active')
    overlay.classList.toggle('active')
})
transactionTypeMenu.lastElementChild.lastElementChild.addEventListener('click', () => {
    transactionTypeMenu.classList.toggle('active')
    overlay.classList.toggle('active')
})



////////////////////////////////////////////////////////////////////  Delete Account PopUp  //////////////////////////////////////////////////////////////////

const deleteAccountConfirmation = document.querySelector('.deleteAccount')
deleteAccountConfirmation.lastElementChild.firstElementChild.addEventListener('click', () => {
    deleteAccountConfirmation.classList.toggle('active')
    overlay.classList.toggle('active')
})

deleteAccountConfirmation.lastElementChild.lastElementChild.addEventListener('click', () => {
    const activeAccountDetailPage = document.querySelector('.tagDetails.active')
    const activeAccountDetailPageId = activeAccountDetailPage.dataset.accId
    const allTransactionEntrys = document.querySelectorAll('.balanceEntry')
    const allEntryDetailPages = document.querySelectorAll('.entryDetail')
    allTransactionEntrys.forEach(TA => {
        if (!TA) return
        if (TA.dataset.entryType === 'transfer') return
        if (TA.querySelector('.accounts-tag').dataset.accId === activeAccountDetailPageId) {
            const TACategoryId = TA.querySelector('.category-tag').dataset.catId
            const TAParent = TA.parentElement
            const TAHistory = TAParent.parentElement
            TAParent.removeChild(TA)
            if (TACategoryId !== 'noCategory') {
                sumCategorieTotal(TACategoryId)
                sumCategoriesThisMonthBalance(TACategoryId)
            }
            sumTransactionTotalAmount(TAParent)
            if (TAParent.children.length < 2) TAHistory.removeChild(TAParent)
            const TAEntryDetailPage = document.querySelector(`.entryDetail#${TA.dataset.id}`)
            if (!TAEntryDetailPage) return
            document.body.removeChild(TAEntryDetailPage)

            transactionStorage.forEach(obj => {
                if (obj.id === TA.dataset.id) {
                    const index = transactionStorage.indexOf(obj)
                    transactionStorage.splice(index, 1)
                    localStorage.setItem('transactions', JSON.stringify(transactionStorage))
                }
            })
        }
    })
    
    overlay.classList.toggle('active')
    deleteAccountConfirmation.classList.toggle('active')
    overviewMenu.classList.toggle('active')
    activeAccountDetailPage.classList.toggle('active')

    sumCashflowTotalAmount()
    sumIncomeAndExpensesTotalAmount()
    
    document.body.removeChild(activeAccountDetailPage)
    const accountsBody = accountsMenu.querySelector('.accountsBody')
    const accountEntry = accountsBody.querySelector(`.accountEntry[data-acc-id="${activeAccountDetailPageId}"]`)
    accountsBody.removeChild(accountEntry)

    sumCurrentAccountBalance()
    sumCategoriesIncomeAndExpensesAmount()
    checkTransactionHistoryIsEmpty()    

    accountsStorage.forEach(obj => {
        if (obj.accName === activeAccountDetailPageId) {
            const index = accountsStorage.indexOf(obj)
            accountsStorage.splice(index, 1)
            localStorage.setItem('accounts', JSON.stringify(accountsStorage))
        }
    })
})

////////////////////////////////////////////////////////////////////  Delete Category PopUp  //////////////////////////////////////////////////////////////////

const deleteCategoryConfirmation = document.querySelector('.deleteCategory')
deleteCategoryConfirmation.lastElementChild.firstElementChild.addEventListener('click', () => {
    deleteCategoryConfirmation.classList.toggle('active')
    overlay.classList.toggle('active')
})

deleteCategoryConfirmation.lastElementChild.lastElementChild.addEventListener('click', () => {
    const activeCategoryDetailPage = document.querySelector('.tagDetails.active')
    const activeCategoryDetailPageId = activeCategoryDetailPage.dataset.catId
    const allTransactionEntrys = document.querySelectorAll('.balanceEntry')
    allTransactionEntrys.forEach(TA => {
        if (!TA) return
        if (TA.dataset.entryType === 'transfer') return
        if (TA.querySelector('.category-tag').dataset.catId === activeCategoryDetailPageId) {
            const TACategoryId = TA.querySelector('.category-tag').dataset.catId
            const TAParent = TA.parentElement
            const TAHistory = TAParent.parentElement
            const TACategoryDetailPage = TAHistory.parentElement.parentElement
            if (!TACategoryDetailPage.isSameNode(activeCategoryDetailPage)) return
            const TAEntryDetailPage = document.querySelector(`.entryDetail#${TA.dataset.id}`)
            activeCategoryDetailPage.classList.toggle('active')
            TAEntryDetailPage.classList.toggle('active')
            TAEntryDetailPage.querySelector('.categoryField').click()
            chooseCategoryMenu.querySelector('.categoriesRow .active').click()
            chooseCategoryMenu.lastElementChild.lastElementChild.click()
            TAEntryDetailPage.querySelector('.actionBottomMenu').lastElementChild.lastElementChild.click()
            overviewMenu.classList.toggle('active')
            TAParent.removeChild(TA)
            if (TACategoryId !== 'noCategory') {
                sumCategorieTotal(TACategoryId)
                sumCategoriesThisMonthBalance(TACategoryId)
            }
            sumTransactionTotalAmount(TAParent)
            if (TAParent.children.length < 2) TAHistory.removeChild(TAParent)
        }
    })
    
    overlay.classList.toggle('active')
    deleteCategoryConfirmation.classList.toggle('active')
    overviewMenu.classList.toggle('active')
    activeCategoryDetailPage.classList.toggle('active')

    sumCashflowTotalAmount()
    sumIncomeAndExpensesTotalAmount()

    document.body.removeChild(activeCategoryDetailPage)
    const categoriesBody = categoriesMenu.querySelector('.categoriesBody')
    const categorieEntry = categoriesBody.querySelector(`.categorieEntry[data-cat-id="${activeCategoryDetailPageId}"]`)
    categoriesBody.removeChild(categorieEntry)

    sumCurrentAccountBalance()
    sumCategoriesIncomeAndExpensesAmount()
    checkTransactionHistoryIsEmpty()    

    categoriesStorage.forEach(obj => {
        if (obj.catName === activeCategoryDetailPageId) {
            const index = categoriesStorage.indexOf(obj)
            categoriesStorage.splice(index, 1)
            localStorage.setItem('categories', JSON.stringify(categoriesStorage))
        }
    })
})

////////////////////////////////////////////////////////////////////  Delete Transaction PopUp  //////////////////////////////////////////////////////////////////


const deleteTransaction = document.querySelector('.deleteTransaction')
const closeDelPopUp = document.querySelector('.deleteTransaction').lastElementChild.firstElementChild
const agreeDelPopUp = document.querySelector('.deleteTransaction').lastElementChild.lastElementChild

closeDelPopUp.addEventListener('click', () => {
    overlay.classList.toggle('active')
    deleteTransaction.classList.toggle('active')
})

agreeDelPopUp.addEventListener('click', () => {
    const activeEntryDetail = document.querySelector('.entryDetail.active')
    const activeEntryDetailDate = new Date(activeEntryDetail.querySelector('#createdOn').value).getDate()
    const activeEntryDetailID = activeEntryDetail.id
    const allTransactionHistorys = document.querySelectorAll('.transactionHistory')
    const activeTransactionHistoryEntryDate = document.querySelector('.transactionHistory').querySelector(`[data-order="${activeEntryDetailDate}."]`)
    const activeEntryAccount = activeEntryDetail.querySelector('.accountsRow').querySelector('.active').id
    
    allTransactionHistorys.forEach(history => {
        if (history.querySelector(`.balanceEntry[data-id="${activeEntryDetailID}"]`)) {
            const balanceEntry = history.querySelector(`.balanceEntry[data-id="${activeEntryDetailID}"]`)
            const balanceEntryDate = balanceEntry.parentElement
            balanceEntryDate.removeChild(balanceEntry)
            if (balanceEntryDate.children.length < 2) history.removeChild(balanceEntryDate)
        }
    })

    document.body.removeChild(activeEntryDetail)
    
    sumTransactionTotalAmount(activeTransactionHistoryEntryDate)
    transactionStorage.forEach(obj => {
        if (obj.id === activeEntryDetailID) {
            const index = transactionStorage.indexOf(obj)
            transactionStorage.splice(index, 1)
            localStorage.setItem('transactions', JSON.stringify(transactionStorage))
        }
    })
    
    sumCashflowTotalAmount()
    sumIncomeAndExpensesTotalAmount()
    if (activeEntryDetail.querySelector('.categoryField')) {
        const activeEntryCategory = activeEntryDetail.querySelector('.categoryField').dataset.catId
        if (activeEntryCategory) {
            sumCategorieTotal(activeEntryCategory)
            sumCategoriesThisMonthBalance(activeEntryCategory)
        }
    }
    if (entryType === 'transfer') {
        const activeEntryTransferRowAccount = activeEntryDetail.querySelector('.secondAccountsRow .active').textContent
        sumAccountTotal(activeEntryTransferRowAccount)
    }
    sumAccountTotal(activeEntryAccount)
    sumAccountsThisMonthBalance(activeEntryAccount)
    sumCurrentAccountBalance()
    sumCategoriesIncomeAndExpensesAmount()
    checkTransactionHistoryIsEmpty()

    overlay.classList.toggle('active')
    deleteTransaction.classList.toggle('active')
    overviewMenu.classList.toggle('active')
})

////////////////////////////////////////////////////////////////////  Choose Month Menu  /////////////////////////////////////////////////////////////////



const monthsRow = monthPickerMenu.querySelector('.monthsRow')
Array.from(monthsRow.children).forEach(month => {
    month.addEventListener('click', () => {
        if (monthsRow.querySelector('.active')) monthsRow.querySelector('.active').classList.toggle('active')
        month.classList.toggle('active')
        deselectRest(monthsRow.querySelector('.active'))
    })

    if (month.textContent === monthPickerBtn.firstElementChild.nextSibling.textContent) {
        month.classList.toggle('active')
    }
})

function showActualMonthTransactions(menu) {
    const actualMonth = monthsRow.querySelector('.active')
    const allTransactions = menu.querySelectorAll('.balanceEntryDate')
    allTransactions.forEach(TA => {
        if (TA.dataset.month === actualMonth.textContent) {
            if (TA.classList.contains('notDisplayed')) TA.classList.remove('notDisplayed')
            return
        } else {
            TA.classList.add('notDisplayed')
        }
    })
}


const customRange = monthPickerMenu.querySelector('.customRange')
const fromDate = customRange.querySelector('.fromDate')
const toDate = customRange.querySelector('.toDate')
fromDate.addEventListener('input', (e) => selectCustomRange(e))
toDate.addEventListener('input', (e) => selectCustomRange(e))

function selectCustomRange(e) {
    if (e.target.value !== '') {
        e.target.classList.add('active')
        deselectRest(e.target)
    } else {
        e.target.classList.remove('active')
        deselectRest(e.target)
    }
}

function showCustomDateTransaction(menu) {
    const fromDateCustomDate = new Date(fromDate.value).getDate()
    const fromDateCustomMonth = new Date(fromDate.value).getMonth()
    const toDateCustomDate = new Date(toDate.value).getDate()
    const toDateCustomMonth = new Date(toDate.value).getMonth()

    const actualDateToDate = new Date().getDate()
    const actualDateToMonth = new Date().getMonth()

    const allTransactions = menu.querySelectorAll('.balanceEntryDate')
    allTransactions.forEach(TA => {
        let TAMonthInNumber = Object.keys(monthsNameInNumbers).indexOf(TA.dataset.month)

        if (fromDate.classList.contains('active') && toDate.classList.contains('active')) {
            if (TA.dataset.order >= fromDateCustomDate && TAMonthInNumber === fromDateCustomMonth) {
                if (TA.classList.contains('notDisplayed')) TA.classList.remove('notDisplayed')
            } else if (TAMonthInNumber > fromDateCustomMonth) {
                if (TA.classList.contains('notDisplayed')) TA.classList.remove('notDisplayed')
            } else {
                if (!TA.classList.contains('notDisplayed')) TA.classList.add('notDisplayed')
            }
            if (TA.dataset.order > toDateCustomDate && TAMonthInNumber === toDateCustomMonth) {
                if (!TA.classList.contains('notDisplayed')) TA.classList.add('notDisplayed')
            } 
            if (TAMonthInNumber > toDateCustomMonth) {
                if (!TA.classList.contains('notDisplayed')) TA.classList.add('notDisplayed')
            }
        } else if (fromDate.classList.contains('active')) {
            if (TA.dataset.order >= fromDateCustomDate && TAMonthInNumber === fromDateCustomMonth) {
                if (TA.classList.contains('notDisplayed')) TA.classList.remove('notDisplayed')
            } else if (TAMonthInNumber > fromDateCustomMonth) {
                if (TA.classList.contains('notDisplayed')) TA.classList.remove('notDisplayed')
            } else {
                if (!TA.classList.contains('notDisplayed')) TA.classList.add('notDisplayed')
            }
            if (TA.dataset.order > actualDateToDate && TAMonthInNumber === actualDateToMonth) {
                if (!TA.classList.contains('notDisplayed')) TA.classList.add('notDisplayed')
            } 
            if (TAMonthInNumber > actualDateToMonth) {
                if (!TA.classList.contains('notDisplayed')) TA.classList.add('notDisplayed')
            }
        } else if (toDate.classList.contains('active')) {
            if (TA.dataset.order <= toDateCustomDate && TAMonthInNumber === toDateCustomMonth) {
                if (TA.classList.contains('notDisplayed')) TA.classList.remove('notDisplayed')
            } else if (TAMonthInNumber < toDateCustomMonth) {
                if (TA.classList.contains('notDisplayed')) TA.classList.remove('notDisplayed')
            } else {
                if (!TA.classList.contains('notDisplayed')) TA.classList.add('notDisplayed')
            }
        }
    })
}

const inTheLastNumberInput = monthPickerMenu.querySelector('#numberInput')
const inTheLastTimeFrame = monthPickerMenu.querySelector('#selectTimeFrame')
inTheLastNumberInput.addEventListener('input', changeInTheLastNumberInput)
inTheLastTimeFrame.addEventListener('click', () => {
    inTheLastNumberInput.value = '1'
    changeInTheLastNumberInput()
})

function changeInTheLastNumberInput() {
    if (inTheLastNumberInput.value !== '0' && inTheLastNumberInput.value !== '') {
        inTheLastNumberInput.classList.add('active')
        deselectRest(inTheLastNumberInput)
    } else {
        inTheLastNumberInput.classList.remove('active')
        deselectRest(inTheLastNumberInput)
    }
}

function showLastTimeFrames(menu, numberInput, timeframeInput) {
    let timeframe = timeframeInput
    switch (timeframe) {
        case 'Days':
            timeframe = numberInput * '1'
            break
        case 'Weeks':
            timeframe = numberInput * '7'
            break
        case 'Months':
            timeframe = numberInput * '30'
            break
        case 'Years':
            timeframe = numberInput * '365'
            break
    }

    const actualDateinMiliseconds = Math.floor(Date.now() / 1000 / 60 / 60 / 24)
    let countBackDate = new Date((actualDateinMiliseconds - timeframe) * 1000 * 60 * 60 * 24)
    let countBackDateToDate = countBackDate.getDate()
    let countBackDateToMonth = countBackDate.getMonth()


    const actualDateToDate = new Date().getDate()
    const actualDateToMonth = new Date().getMonth()

    const allTransactions = menu.querySelectorAll('.balanceEntryDate')
    allTransactions.forEach(TA => {
        let TAMonthInNumber = Object.keys(monthsNameInNumbers).indexOf(TA.dataset.month)
        if (TAMonthInNumber >= countBackDateToMonth) {
            if (TA.dataset.order >= countBackDateToDate && TAMonthInNumber === countBackDateToMonth) {
                if (TA.classList.contains('notDisplayed')) TA.classList.remove('notDisplayed')
            } else if (TAMonthInNumber > countBackDateToMonth) {
                if (TA.classList.contains('notDisplayed')) TA.classList.remove('notDisplayed')
            } else {
                if (!TA.classList.contains('notDisplayed')) TA.classList.add('notDisplayed')
            }
            if (TA.dataset.order > actualDateToDate && TAMonthInNumber === actualDateToMonth) {
                if (!TA.classList.contains('notDisplayed')) TA.classList.add('notDisplayed')
            } 
            if (TAMonthInNumber > actualDateToMonth) {
                if (!TA.classList.contains('notDisplayed')) TA.classList.add('notDisplayed')
            }
        }
    })
}


const selectAllTimeBtn = monthPickerMenu.querySelector('.allTime span')
selectAllTimeBtn.addEventListener('click', () => {
    if (!selectAllTimeBtn.classList.contains('active')) {
        selectAllTimeBtn.textContent = 'Unselect All Time'
        selectAllTimeBtn.classList.toggle('active')
        deselectRest(selectAllTimeBtn)
    } else {
        selectAllTimeBtn.classList.toggle('active')
        if (selectAllTimeBtn.textContent !== 'Select All Time') selectAllTimeBtn.textContent = 'Select All Time'
        deselectRest(selectAllTimeBtn)
    } 
})

function selectAllTime() {
    const allTransactions = overviewMenu.querySelectorAll('.balanceEntryDate')
    if (selectAllTimeBtn.classList.contains('active')) {
        selectAllTimeBtn.textContent = 'Unselect All Time'
        allTransactions.forEach(TA => {
            if (TA.classList.contains('notDisplayed')) TA.classList.remove('notDisplayed')
        })
    } else {
        selectAllTimeBtn.textContent = 'Select All Time'
        allTransactions.forEach(TA => {
            TA.classList.add('notDisplayed')
        })
    } 
}

function showAllSelctedTransaction(menu) {
    const allTransactions = menu.querySelectorAll('.balanceEntryDate')
    allTransactions.forEach(TA => {
        if (TA.classList.contains('notDisplayed')) TA.classList.remove('notDisplayed')
    })
}

function setTransactionOverview(menu) {
    const activeMonth = monthsRow.querySelector('.active')
    const allMonthFilter = document.querySelectorAll('.monthFilter')
    if (activeMonth) {
        allMonthFilter.forEach(filter => {
            const displayedMonth = filter.firstElementChild.nextSibling
            displayedMonth.textContent = activeMonth.textContent
        })
        allPrevMonthBtn.forEach(btn => btn.classList.remove('hidden'))
        allNextMonthBtn.forEach(btn => btn.classList.remove('hidden'))
        showActualMonthTransactions(menu)
    } else if (fromDate.classList.contains('active') && toDate.classList.contains('active')) {
        if (fromDate.value > toDate.value) {
            alert(`From Date: ${fromDate.value} is bigger than ToDate: ${toDate.value}`)
            return
        }
        allMonthFilter.forEach(filter => {
            const displayedMonth = filter.firstElementChild.nextSibling
            displayedMonth.textContent = `From ${monthPicker(new Date(fromDate.value).getMonth())} ${new Date(fromDate.value).getDate()} to ${monthPicker(new Date(toDate.value).getMonth())} ${new Date(toDate.value).getDate()}`
        })
        showCustomDateTransaction(menu)
    } else if (fromDate.classList.contains('active')) {
        allMonthFilter.forEach(filter => {
            const displayedMonth = filter.firstElementChild.nextSibling
            displayedMonth.textContent = `From ${monthPicker(new Date(fromDate.value).getMonth())} ${new Date(fromDate.value).getDate()}`
        })
        showCustomDateTransaction(menu)
    } else if (toDate.classList.contains('active')) {
        allMonthFilter.forEach(filter => {
            const displayedMonth = filter.firstElementChild.nextSibling
            displayedMonth.textContent = `To ${monthPicker(new Date(toDate.value).getMonth())} ${new Date(toDate.value).getDate()}`
        })
        showCustomDateTransaction(menu)
    } else if (inTheLastNumberInput.classList.contains('active')) {
        allMonthFilter.forEach(filter => {
            const displayedMonth = filter.firstElementChild.nextSibling
            displayedMonth.textContent = `last ${inTheLastNumberInput.value} ${inTheLastTimeFrame.value}`
        })
        showLastTimeFrames(menu, inTheLastNumberInput.value, inTheLastTimeFrame.value)
    } else if (selectAllTimeBtn.classList.contains('active')) {
        allMonthFilter.forEach(filter => {
            const displayedMonth = filter.firstElementChild.nextSibling
            displayedMonth.textContent = 'All Transactions'
        })
        showAllSelctedTransaction(menu)
    } else {
        monthPickerMenu.classList.toggle('active')
        overlay.classList.toggle('active')
    }
}

let latestMonthPickerMenuClone = monthPickerMenu.cloneNode(true)
function closeMonthPicker() {
    const activeMonth = monthsRow.querySelector('.active')
    const activeMonthClone = latestMonthPickerMenuClone.querySelector('.month-tag.active')
    if (activeMonth !== activeMonthClone) {
        if (activeMonth) {
            activeMonth.classList.toggle('active')
        }
        Array.from(monthsRow.children).forEach(child => {
            if (child.textContent !== activeMonthClone.textContent) return
            child.classList.toggle('active')
        })
    }
    const fromDateClone = latestMonthPickerMenuClone.querySelector('.fromDate')
    if (fromDate.value !== fromDateClone.value) {
        fromDate.value = fromDateClone.value
    }
    const toDateClone = latestMonthPickerMenuClone.querySelector('.toDate')
    if (toDate.value !== toDateClone.value) {
        toDate.value = toDateClone.value
    }
    const inTheLastNumberInputClone = latestMonthPickerMenuClone.querySelector('#numberInput')
    if (inTheLastNumberInput.value !== inTheLastNumberInputClone.value) {
        inTheLastNumberInput.value = inTheLastNumberInputClone.value
    }
    const selectAllBtnClone = latestMonthPickerMenuClone.querySelector('.allTime span')
    if (selectAllTimeBtn.className !== selectAllBtnClone.className) {
        selectAllTimeBtn.classList.toggle('active')
    }
}

function resetMonthPickerValues() {
    if (!fromDate.classList.contains('active')) fromDate.value = ''
    if (!toDate.classList.contains('active')) toDate.value = ''
    if (!inTheLastNumberInput.classList.contains('active')) inTheLastNumberInput.value = '0'
}

function deselectRest(selectedFilter) {
    if (monthsRow.querySelector('.active')) {
        if (selectedFilter !== monthsRow.querySelector('.active')) {
            monthsRow.querySelector('.active').classList.toggle('active')
            allPrevMonthBtn.forEach(btn => btn.classList.add('hidden'))
            allNextMonthBtn.forEach(btn => btn.classList.add('hidden'))
        }
    }
    if (fromDate.classList.contains('active') || toDate.classList.contains('active')) {
        if (fromDate.classList.contains('active')) {
            if (selectedFilter !== fromDate) {
                if (selectedFilter === toDate) return
                fromDate.value = ''
                fromDate.classList.remove('active')
            }
        }
        if (toDate.classList.contains('active')) {
            if (selectedFilter !== toDate) {
                toDate.value = ''
                toDate.classList.remove('active')
            }
        }
    }
    if (inTheLastNumberInput.classList.contains('active')) {
        if (selectedFilter !== inTheLastNumberInput) {
            inTheLastNumberInput.value = '0'
            inTheLastNumberInput.classList.remove('active')
        }
    }
    if (selectAllTimeBtn.classList.contains('active')) {
        if (selectedFilter !== monthPickerMenu.querySelector('.allTime span.active')) {
            selectAllTimeBtn.classList.toggle('active')
            if (selectAllTimeBtn.textContent !== 'Select All Time') selectAllTimeBtn.textContent = 'Select All Time'
        }
    } 
    if (!monthsRow.querySelector('.active') && !fromDate.classList.contains('active') && !toDate.classList.contains('active') && !inTheLastNumberInput.classList.contains('active') && !selectAllTimeBtn.classList.contains('active')) {
        monthPickerMenu.lastElementChild.lastElementChild.classList.add('deactivated')
    } else {
        monthPickerMenu.lastElementChild.lastElementChild.classList.remove('deactivated')
    }
}

function monthPickerSetBtn() {
    setTransactionOverview(overviewMenu)
    setTransactionOverview(incomeMenu)
    setTransactionOverview(expensesMenu)
    const allTagEntryDetails = document.querySelectorAll('.tagDetails')
    allTagEntryDetails.forEach(tagMenu => {
        setTransactionOverview(tagMenu)
        sumAccountsIncomeAndExpensesAmount(tagMenu)
    })
    sumCashflowTotalAmount()
    sumIncomeAndExpensesTotalAmount()
    sumCategoriesIncomeAndExpensesAmount()
    checkTransactionHistoryIsEmpty()
}

monthPickerMenu.lastElementChild.lastElementChild.addEventListener('click', () => {
    monthPickerMenu.classList.toggle('active')
    overlay.classList.toggle('active')
    monthPickerSetBtn()
})

monthPickerMenu.lastElementChild.firstElementChild.addEventListener('click', () => {
    overlay.classList.toggle('active')
    monthPickerMenu.classList.toggle('active')
    closeMonthPicker()
    resetMonthPickerValues()
    fromDate.classList.remove('active')
    toDate.classList.remove('active')
})

////////////////////////////////////////////////////////////////////  Tag Entry Detail Menu  /////////////////////////////////////////////////////////////////

const allTagEntryDetailMenu = document.querySelectorAll('.tagDetails')
allTagEntryDetailMenu.forEach(entry => {
    const closeTagMenuBtn = entry.firstElementChild.firstElementChild
    closeTagMenuBtn.addEventListener('click', () => {
        entry.classList.toggle('active')
        prevPageArr[0].classList.toggle('active')
        prevPageArr.shift()
    })

    const addIncomeBtn = entry.querySelector('.incomeForTag').lastElementChild
    addIncomeBtn.addEventListener('click', () => {
        prevOverview(entry)
        newIncomeEntryPage.classList.toggle('active')
        chooseAccountMenu.classList.toggle('active')
        overlay.classList.toggle('active')
        refreshCategoryRow()
        refreshCategoryTag()
        refreshDescription()
        refreshDate()
        refreshTransactionRow()
        refreshAddedAmount()
        refreshChooseAccountAmountToAdd()
        checkEntryType()        
    })

    const addExpensesBtn = entry.querySelector('.expensesForTag').lastElementChild
    addExpensesBtn.addEventListener('click', () => {
        prevOverview(entry)
        newExpensesEntryPage.classList.toggle('active')
        chooseAccountMenu.classList.toggle('active')
        overlay.classList.toggle('active')
        refreshCategoryRow()
        refreshCategoryTag()
        refreshDescription()
        refreshDate()
        refreshTransactionRow()
        refreshAddedAmount()
        refreshChooseAccountAmountToAdd()
        checkEntryType()        
    })

    const deleteAccountBtn = entry.querySelector('.deleteAccBtn')
    deleteAccountBtn.addEventListener('click', () => {
        deleteAccountConfirmation.classList.toggle('active')
        overlay.classList.toggle('active')
    })
      
    const editAccountBtn = entry.querySelector('.editAccBtn')
    editAccountBtn.addEventListener('click', () => {
        overlay.classList.toggle('active')
        editAccountMenu.classList.toggle('active')
        const editAccountInput = editAccountMenu.querySelector('input')
        const editAccountIcon = editAccountMenu.querySelector('.accountName span')
        const editAccountColors = editAccountMenu.querySelectorAll('.colorRow span')
        editAccountInput.value = entry.querySelector('h2').textContent
        editAccountIcon.firstElementChild.classList.replace(editAccountIcon.firstElementChild.classList[1], entry.querySelector('h2').firstElementChild.classList[1])
        editAccountColors.forEach(color => {
            if (color.style.backgroundColor !== entry.style.backgroundColor) return
            if (color.classList.contains('active')) return
            editAccountMenu.querySelector('.colorRow .active').classList.toggle('active')
            color.classList.toggle('active')
        })
    })
})

/////////////////////////////////////////////////////////////////  Categories Menu  ////////////////////////////////////////////////////////////////

const addCategorieBtn = categoriesMenu.querySelector('#addBtn')
addCategorieBtn.addEventListener('click', () => {
    createCategoryMenu.classList.toggle('active')
    prevAccountRow(overlay)
})

const homeBtnInCategoryMenu = categoriesMenu.querySelector('#homeBtn')
homeBtnInCategoryMenu.addEventListener('click', () => {
    categoriesMenu.classList.toggle('active')
    overviewMenu.classList.toggle('active')
})

const accountsBtnInCategoryMenu = categoriesMenu.querySelector('#accountsBtn')
accountsBtnInCategoryMenu.addEventListener('click', () => {
    categoriesMenu.classList.toggle('active')
    accountsMenu.classList.toggle('active')
})

categoriesMenu.firstElementChild.firstElementChild.addEventListener('click', () => {
    categoriesMenu.classList.toggle('active')
    overviewMenu.classList.toggle('active')
})

/////////////////////////////////////////////////////////////////  Income & Expenses Graph Menu  ////////////////////////////////////////////////////////////////

const addIncomeBtn = incomeMenu.firstElementChild.lastElementChild
addIncomeBtn.addEventListener('click', () => {
    prevOverview(incomeMenu)
    newIncomeEntryPage.classList.toggle('active')
    chooseAccountMenu.classList.toggle('active')
    overlay.classList.toggle('active')
    refreshTitle()
    refreshCategoryRow()
    refreshCategoryTag()
    refreshDescription()
    refreshDate()
    refreshTransactionRow()
    refreshAddedAmount()
    refreshChooseAccountAmountToAdd()
    checkEntryType()          
})

const addExpensesBtn = expensesMenu.firstElementChild.lastElementChild
addExpensesBtn.addEventListener('click', () => {
    prevOverview(expensesMenu)
    newExpensesEntryPage.classList.toggle('active')
    chooseAccountMenu.classList.toggle('active')
    overlay.classList.toggle('active')
    refreshTitle()
    refreshCategoryRow()
    refreshCategoryTag()
    refreshDescription()
    refreshDate()
    refreshTransactionRow()
    refreshAddedAmount()
    refreshChooseAccountAmountToAdd()
    checkEntryType()          
})

function cssVar(color) {
    const colorCorr = color.slice(4, -1)
    const style = getComputedStyle(document.body)
    const varColor = style.getPropertyValue(colorCorr)
    return varColor
}

let categoriesIncomeNameArr = []
let categoriesIncomeTransactionsAmountArr = []
let categoriesIncomeBGColorArr = []
let categoriesExpensesNameArr = []
let categoriesExpensesTransactionsAmountArr = []
let categoriesExpensesBGColorArr = []

const ctxIncome = document.getElementById('myIncomeChart').getContext('2d');
const myIncomeChart = new Chart(ctxIncome, {
    type: 'doughnut',
    data: {
        labels: categoriesIncomeNameArr,
        datasets: [{
            label: '# of Votes',
            data: categoriesIncomeTransactionsAmountArr,
            backgroundColor: categoriesIncomeBGColorArr,
            borderWidth: 0
        }]
    },
    options: {
        scales: {
            grid: {
                display: false,
            }
        },
    }
});

const ctxExpenses = document.getElementById('myExpensesChart').getContext('2d');
const myExpensesChart = new Chart(ctxExpenses, {
    type: 'doughnut',
    data: {
        labels: categoriesExpensesNameArr,
        datasets: [{
            label: '# of Votes',
            data: categoriesExpensesTransactionsAmountArr,
            backgroundColor: categoriesExpensesBGColorArr,
            borderWidth: 0
        }]
    },
    options: {
        scales: {
            grid: {
                display: false,
            },
            ticks: {
                display: false,
            }
        },
    }
});

function addData(chart, label, data, bgcolor) {
    chart.data.labels = label;
    chart.data.datasets.forEach((dataset) => {
        dataset.data = data;
    });
    chart.data.datasets.forEach((dataset) => {
        dataset.backgroundColor = bgcolor;
    });
    chart.update();
}

const chartIncomeEntryHistory = incomeMenu.querySelector('.transactionHistory')
const chartExpensesEntryHistory = expensesMenu.querySelector('.transactionHistory')


function createChartCategory() {
    Array.from(chartIncomeEntryHistory.children).forEach(child => chartIncomeEntryHistory.removeChild(child))
    Array.from(chartExpensesEntryHistory.children).forEach(child => chartExpensesEntryHistory.removeChild(child))
    
    const allTransactions = overviewMenu.querySelectorAll('.balanceEntryDate')
    allTransactions.forEach(TA => {
        if (TA.classList.contains('notDisplayed')) return
        const catTags = TA.querySelectorAll('.category-tag')
        catTags.forEach(catTag => {
            if (catTag.parentElement.parentElement.parentElement.dataset.entryType === 'income') {
                const existingChartIncomeEntry = chartIncomeEntryHistory.querySelector(`.chartIncomeEntry[data-cat-id=${catTag.dataset.catId}]`)
                if (existingChartIncomeEntry) return
            
                const chartIncomeEntry = document.createElement('div')
                chartIncomeEntry.classList.add('chartIncomeEntry')
                chartIncomeEntry.dataset.catId = catTag.dataset.catId
                chartIncomeEntry.style.backgroundColor = catTag.style.backgroundColor
                const chartIncomeEntryInnerHTML = `
                <span class="incomeIcon">${catTag.firstElementChild.outerHTML}</span>
                <div class="incomeInfo">
                    <span class="incomeName">${catTag.dataset.catId}</span>
                    <span class="incomeProcent">100.00%</span>
                    <div class="incomeAmount">
                        <span class="amount">0.00</span>
                        <span class="Currency">CHF</span>
                    </div>
                </div>`
                chartIncomeEntry.insertAdjacentHTML('afterbegin', chartIncomeEntryInnerHTML)
                chartIncomeEntryHistory.appendChild(chartIncomeEntry)
            }
            if (catTag.parentElement.parentElement.parentElement.dataset.entryType === 'expenses') {
                const existingChartExpensesEntry = chartExpensesEntryHistory.querySelector(`.chartExpensesEntry[data-cat-id=${catTag.dataset.catId}]`)
                if (existingChartExpensesEntry) return
            
                const chartExpensesEntry = document.createElement('div')
                chartExpensesEntry.classList.add('chartExpensesEntry')
                chartExpensesEntry.dataset.catId = catTag.dataset.catId
                chartExpensesEntry.style.backgroundColor = catTag.style.backgroundColor
                const chartExpensesEntryInnerHTML = `
                <span class="expensesIcon">${catTag.firstElementChild.outerHTML}</span>
                <div class="expensesInfo">
                    <span class="expensesName">${catTag.dataset.catId}</span>
                    <span class="expensesProcent">100.00%</span>
                    <div class="expensesAmount">
                        <span class="amount">0.00</span>
                        <span class="Currency">CHF</span>
                    </div>
                </div>`
                chartExpensesEntry.insertAdjacentHTML('afterbegin', chartExpensesEntryInnerHTML)
                chartExpensesEntryHistory.appendChild(chartExpensesEntry)
            }
        })
    })
}

function sumCategoriesIncomeAndExpensesAmount() {
    const twoDigit = Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    categoriesIncomeBGColorArr.length = 0
    categoriesIncomeNameArr.length = 0
    categoriesIncomeTransactionsAmountArr.length = 0
    categoriesExpensesBGColorArr.length = 0
    categoriesExpensesNameArr.length = 0
    categoriesExpensesTransactionsAmountArr.length = 0
    
    const incomeTotalAmount = incomeMenu.querySelector('.incomeTotal .amount')
    const expensesTotalAmount = expensesMenu.querySelector('.expensesTotal .amount')

    createChartCategory()

    const allChartIncomeEntrys = incomeMenu.querySelectorAll('.chartIncomeEntry')
    allChartIncomeEntrys.forEach(entry => {
        let catIncomeTotal = 0.00
        const allTransactions = overviewMenu.querySelectorAll('.balanceEntryDate')
        allTransactions.forEach(transaction => {
            if (transaction.classList.contains('notDisplayed')) return
            Array.from(transaction.children).forEach(child => {
                if (child.dataset.entryType === 'income') {
                    const catTag = child.querySelector('.category-tag')
                    if (catTag.dataset.catId === entry.dataset.catId) {
                        catIncomeTotal += +child.querySelector('.amount').firstElementChild.textContent
                    }
                }
            })
        })
        const chartIncomeEntryAmonut = entry.querySelector('.amount')
        chartIncomeEntryAmonut.textContent = twoDigit.format(catIncomeTotal)

        const chartIncomeEntryProcent = entry.querySelector('.incomeProcent')
        const procentResult = (100 / incomeTotalAmount.textContent * catIncomeTotal)
        chartIncomeEntryProcent.textContent = twoDigit.format(procentResult) + '%'
        categoriesIncomeTransactionsAmountArr.push(procentResult)
        categoriesIncomeNameArr.push(entry.dataset.catId)
        const catBGColorTransform = cssVar(entry.style.backgroundColor)
        categoriesIncomeBGColorArr.push(catBGColorTransform)
        
    })

    const allChartExpensesEntrys = expensesMenu.querySelectorAll('.chartExpensesEntry')
    allChartExpensesEntrys.forEach(entry => {
        let catExpensesTotal = 0.00
        const allTransactions = overviewMenu.querySelectorAll('.balanceEntryDate')
        allTransactions.forEach(transaction => {
            if (transaction.classList.contains('notDisplayed')) return
            Array.from(transaction.children).forEach(child => {
                if (child.dataset.entryType === 'expenses') {
                    const catTag = child.querySelector('.category-tag')
                    if (catTag.dataset.catId === entry.dataset.catId) {
                        catExpensesTotal += +child.querySelector('.amount').firstElementChild.textContent
                    }
                }
            })
        })
        const chartExpensesEntryAmonut = entry.querySelector('.amount')
        chartExpensesEntryAmonut.textContent = twoDigit.format(catExpensesTotal)

        const chartExpensesEntryProcent = entry.querySelector('.expensesProcent')
        const procentResult = (100 / expensesTotalAmount.textContent * catExpensesTotal)
        chartExpensesEntryProcent.textContent = twoDigit.format(procentResult) + '%'
        categoriesExpensesTransactionsAmountArr.push(procentResult)
        categoriesExpensesNameArr.push(entry.dataset.catId)
        const catBGColorTransform = cssVar(entry.style.backgroundColor)
        categoriesExpensesBGColorArr.push(catBGColorTransform)
    })
    
    addData(myIncomeChart, categoriesIncomeNameArr, categoriesIncomeTransactionsAmountArr, categoriesIncomeBGColorArr)
    addData(myExpensesChart, categoriesExpensesNameArr, categoriesExpensesTransactionsAmountArr, categoriesExpensesBGColorArr)
}

/////////////////////////////////////////////////////////// Search Page Menu /////////////////////////////////////////////////////

const searchResultMenu = document.querySelector('.searchResultMenu')
const searchResultBody = searchResultMenu.querySelector('.searchResultBody')

const closeSearchResultMenu = searchResultMenu.firstElementChild.firstElementChild
closeSearchResultMenu.addEventListener('click', () => {
    searchResultMenu.classList.toggle('active')
    overviewMenu.classList.toggle('active')
    while (searchResultBody.children.length > 0) {
        searchResultBody.removeChild(searchResultBody.firstElementChild)
    }
})

const searchedTransactionsArr = []
const finalResult = []
const searchInput = searchResultMenu.querySelector('#searchInput')
searchInput.addEventListener('input', () => {
    while (searchResultBody.children.length > 0) {
        searchResultBody.removeChild(searchResultBody.firstElementChild)
    }
    searchedTransactionsArr.length = 0
    finalResult.length = 0
    const allTransactionPages = document.querySelectorAll('.entryDetail')
    const allTransactionEntrys = overviewMenu.querySelectorAll('.balanceEntry')
    allTransactionPages.forEach(entry => {
        if (entry.id) {
            const searchedTitle = entry.querySelector('.title').textContent
            if (searchedTitle === searchInput.value) {
                searchedTransactionsArr.push(entry.id)
            }
        }
    })
    allTransactionEntrys.forEach(entry => {
        searchedTransactionsArr.filter(arrEntry => {
            if (arrEntry === entry.dataset.id) {
                finalResult.push(entry)
            }
        })
    })
    finalResult.forEach(result => {
        const searchResultClone = result.cloneNode(true)
        searchResultBody.appendChild(searchResultClone)
    })
})

/////////////////////////////////////////////////////////// Nav Settings Menu /////////////////////////////////////////////////////

const closeSettingsBtn = document.querySelector('nav #closeSettings')
closeSettingsBtn.addEventListener('click', () => {
    navSettingsMenu.classList.toggle('hidden')
})

const searchTransactionBtn = document.querySelector('#searchBtn')
searchTransactionBtn.addEventListener('click', () => {
    searchInput.value = ''

    searchResultMenu.classList.toggle('active')
    overviewMenu.classList.toggle('active')
})

const deleteUserDataBtn = document.querySelector('#deleteUserDataBtn')
const deleteUserDataConfirmationPopUp = document.querySelector('.deleteUserData')
deleteUserDataBtn.addEventListener('click', () => {
    overlay.classList.toggle('active')
    deleteUserDataConfirmationPopUp.classList.toggle('active')
})

deleteUserDataConfirmationPopUp.lastElementChild.firstElementChild.addEventListener('click', () => {
    overlay.classList.toggle('active')
    deleteUserDataConfirmationPopUp.classList.toggle('active')
})

deleteUserDataConfirmationPopUp.lastElementChild.lastElementChild.addEventListener('click', () => {
    overlay.classList.toggle('active')
    deleteUserDataConfirmationPopUp.classList.toggle('active')
    localStorage.clear()
    location.reload()
})

document.addEventListener('click', (e) => {
    if (!navSettingsMenu.classList.contains('hidden')) {
        if (e.target !== navSettingsMenu && e.target !== settingsMenuBtn.firstElementChild) {
            navSettingsMenu.classList.toggle('hidden')
        }
    }
})


/////////////////////////////////////////////////////////// Reorder Page /////////////////////////////////////////////////////

const reorderPopUp = document.querySelector('.reorderAccounts')
const reorderList = reorderPopUp.querySelector('.reorderList')
const closeReorderPopUp = reorderPopUp.lastElementChild.firstElementChild
const saveReorderPopUp = reorderPopUp.lastElementChild.lastElementChild
let reorderSavePoint

closeReorderPopUp.addEventListener('click', () => {
    reorderPopUp.classList.toggle('active')
    overlay.classList.toggle('active')
    if (reorderList.isEqualNode(reorderSavePoint)) return
    Array.from(reorderList.children).forEach(child => {
        const findChild = Array.from(reorderSavePoint.children).find(childSP => {
            return child.textContent !== childSP.textContent
        })
        child.firstElementChild.nextSibling.textContent = findChild.textContent
    })
})

saveReorderPopUp.addEventListener('click', () => {
    reorderPopUp.classList.toggle('active')
    overlay.classList.toggle('active')
    const reorderAccList = [...reorderList.querySelectorAll('.draggable')]
    const allAccEntrys = [...accountsMenu.querySelectorAll('.accountEntry')]
    const newOrderList = []

    reorderAccList.forEach(reorderAcc => {
        allAccEntrys.find(acc => {
           if (reorderAcc.textContent === acc.dataset.accId) return newOrderList.push(acc)
        })
    })
    newOrderList.forEach(acc => {
        const accountsBody = accountsMenu.querySelector('.accountsBody')
        accountsBody.appendChild(acc)
    })
})

reorderList.addEventListener('dragover', (e) => {
    const draggable = reorderList.querySelector('.dragging')
    const afterElement = getDragAfterElement(e.y)
    reorderList.insertBefore(draggable, afterElement)
})

function getDragAfterElement(y) {
    const filteredDraggables = [...reorderList.querySelectorAll('.draggable:not(.dragging)')]
    return filteredDraggables.reduce((closest, child) => {
        const elementPosition = child.getBoundingClientRect()
        const positionDiff = y - elementPosition.top - elementPosition.height / 2
        if (positionDiff < 0 && positionDiff > closest.offset) {
            return { offset: positionDiff, element: child}
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

function showCreatedAccounts() {
    while (reorderList.children.length !== 0) {
        reorderList.removeChild(reorderList.firstElementChild)
    }
    const allAccEntrys = accountsMenu.querySelectorAll('.accountEntry')
    allAccEntrys.forEach(acc => {
        const newSpan = document.createElement('span')
        newSpan.classList.add('entry', 'tagWtBtn', 'draggable')
        newSpan.setAttribute('draggable', true)
        newSpan.textContent = acc.dataset.accId
        const newSpanInnerHtml = `<i class="fa-solid fa-grip-vertical">`
        newSpan.insertAdjacentHTML('afterbegin', newSpanInnerHtml)
        reorderList.appendChild(newSpan)
    })

    const allDraggables = reorderPopUp.querySelectorAll('.draggable')
    allDraggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging')
        })
        
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
        })    
    })    

    reorderSavePoint = reorderList.cloneNode(true)
}

/////////////////////////////////////////////////////////// After Page loaded /////////////////////////////////////////////////////

checkTransactionHistoryIsEmpty()

accountsStorage.forEach(saveNewAccount)
categoriesStorage.forEach(addNewCategory)
transactionStorage.forEach(saveNewEntry)