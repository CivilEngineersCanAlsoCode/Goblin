-- Amex Job Application Automation Script with window-based logic

-- Configuration
local config = {
    tabDelayMin = 50,
    tabDelayMax = 100,
    waitAfterEnter = 8000,
    longWait = 10000,
    chromeAppName = "Google Chrome",
    targetWindow = "Careers at American Express - Google Chrome"
}

-- Automation state
local automation = {
    isRunning = false,
    isPaused = false,
    currentJob = 1,
    totalOpenings = 0,
    userInputs = {
        profile = "",
        location = "",
        name = ""
    }
}

-- Utility functions
local function randomSleep(min, max)
    local sleepTime = math.random(min or config.tabDelayMin, max or config.tabDelayMax)
    hs.timer.usleep(sleepTime * 1000)
end

local function notify(title, message, duration)
    hs.notify.new({title = title, informativeText = message or "", withdrawAfter = duration or 2}):send()
end

local function pressTab(count)
    for _ = 1, count do
        hs.eventtap.keyStroke({}, "tab")
        randomSleep()
    end
end

local function pressShiftTab(count)
    for _ = 1, count do
        hs.eventtap.keyStroke({"shift"}, "tab")
        randomSleep()
    end
end

local function pressEnter(message, waitTime)
    notify("Enter", message or "")
    hs.eventtap.keyStroke({}, "return")
    hs.timer.usleep(waitTime or config.waitAfterEnter)
end

local function copyAndPaste(text)
    hs.pasteboard.setContents(text)
    randomSleep()
    hs.eventtap.keyStroke({"cmd"}, "v")
    randomSleep()
end

local function getCurrentWindowName()
    local win = hs.window.frontmostWindow()
    return win and win:title() or ""
end

local function refreshBrowserWindow()
    hs.eventtap.keyStroke({"cmd"}, "r")
    randomSleep(500, 700)
end

local function verifyWindow(expected)
    return string.find(getCurrentWindowName(), expected, 1, true) ~= nil
end

local function closeCurrentWindow()
    hs.eventtap.keyStroke({"cmd"}, "w")
    hs.timer.usleep(1000000)
end

local function refocusMainWindow()
    local chromeApp = hs.application.find(config.chromeAppName)
    if chromeApp then
        chromeApp:activate()
        hs.timer.usleep(1000000)
        for _, w in ipairs(chromeApp:allWindows()) do
            if string.find(w:title(), "Careers at American Express", 1, true) then
                w:focus()
                hs.timer.usleep(500000)
                return true
            end
        end
    end
    return false
end

local function applyToJob(jobNumber)
    local k = ((jobNumber - 1) % 10) + 1
    pressTab(k)
    pressEnter("Open job")
    pressTab(2)
    pressEnter("Click apply")
    hs.timer.usleep(config.longWait)
end

-- Step implementations
local function resumeCoverLetter()
    if not verifyWindow("Resume / CV and Cover Letter") then return false end
    pressTab(1)
    pressEnter("Continue")
    pressTab(11)
    pressEnter("Submit resume")
    return true
end

local function contactInformation()
    if not verifyWindow("Contact Information") then return false end
    pressTab(1)
    pressEnter("Continue")
    -- check referral field content
    hs.eventtap.keyStroke({"cmd"}, "c")
    local contents = hs.pasteboard.getContents()
    if not contents or contents == "" then
        copyAndPaste("Referral")
        hs.timer.usleep(math.random(8000, 10000) * 1000)
        pressTab(1)
        copyAndPaste("Referred by Amex employee")
    end
    pressTab(17)
    pressEnter("Submit contact info")
    return true
end

local function experienceEducation()
    if not verifyWindow("Experience/Education") then return false end
    pressTab(1)
    pressEnter("Continue")
    pressTab(59)
    pressEnter("Submit experience")
    return true
end

local function generalQuestions()
    if not verifyWindow("General Questions") then return false end
    pressTab(1)
    pressEnter("Continue")
    pressTab(25)
    pressEnter("Submit questions")
    return true
end

local function demographics()
    if not verifyWindow("Demographics") then return false end
    pressTab(1)
    pressEnter("Continue")
    pressTab(2)
    pressEnter("Submit demographics")
    return true
end

local function eSignature()
    if not verifyWindow("eSignature") then return false end
    pressTab(1)
    pressEnter("Continue")
    pressTab(2)
    hs.eventtap.keyStroke({"cmd"}, "c")
    local txt = hs.pasteboard.getContents()
    if txt and txt ~= "" then
        pressEnter("Already applied")
    else
        copyAndPaste(automation.userInputs.name)
        pressTab(1)
        pressEnter("Submit signature")
    end
    return true
end

local function reviewAndSubmit()
    if not verifyWindow("Review and Submit") then return false end
    pressTab(1)
    pressEnter("Continue")
    pressTab(11)
    pressEnter("Final submit")
    return true
end

local function thankYou()
    if not verifyWindow("Thank You") then return false end
    closeCurrentWindow()
    refocusMainWindow()
    refreshBrowserWindow()
    return false
end

-- window-based logic dispatcher
local function executeWindowBasedLogic()
    local title = getCurrentWindowName()
    if title == "" then return false end
    if string.find(title, "Resume / CV and Cover Letter", 1, true) then
        return resumeCoverLetter()
    elseif string.find(title, "Contact Information", 1, true) then
        return contactInformation()
    elseif string.find(title, "Experience/Education", 1, true) then
        return experienceEducation()
    elseif string.find(title, "General Questions", 1, true) then
        return generalQuestions()
    elseif string.find(title, "Demographics", 1, true) then
        return demographics()
    elseif string.find(title, "eSignature", 1, true) then
        return eSignature()
    elseif string.find(title, "Review and Submit", 1, true) then
        return reviewAndSubmit()
    elseif string.find(title, "Thank You", 1, true) then
        return thankYou()
    else
        notify("Unknown window", title)
        return true
    end
end

-- Execute a single job application
local function executeJobApplication()
    if not applyToJob(automation.currentJob) then return false end
    hs.timer.usleep(config.longWait)
    local continue = true
    while continue do
        continue = executeWindowBasedLogic()
        randomSleep(500, 800)
    end
    return true
end

-- Main loop
local function runAutomation()
    automation.currentJob = 1
    while automation.currentJob <= automation.totalOpenings do
        if executeJobApplication() then
            automation.currentJob = automation.currentJob + 1
        else
            break
        end
    end
end

-- Hotkey or user input logic should trigger runAutomation()
