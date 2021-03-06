import { emptyResults, failsResultsWithoutMessages, warnResults, failsResults, summaryResults } from "../../_tests/fixtures/ExampleDangerResults"
import { template as githubResultsTemplate } from "../../templates/githubIssueTemplate"

describe("generating messages", () => {
  it("shows no tables for empty results", () => {
    const issues = githubResultsTemplate(emptyResults)
    expect(issues).not.toContain("Fails")
    expect(issues).not.toContain("Warnings")
    expect(issues).not.toContain("Messages")
  })

  it("shows no tables for results without messages", () => {
    const issues = githubResultsTemplate(failsResultsWithoutMessages)
    expect(issues).not.toContain("Fails")
    expect(issues).not.toContain("Warnings")
    expect(issues).not.toContain("Messages")
  })

  it("Shows the failing messages in a table", () => {
    const issues = githubResultsTemplate(failsResults)
    expect(issues).toContain("Fails")
    expect(issues).not.toContain("Warnings")
  })

  it("Shows the warning messages in a table", () => {
    const issues = githubResultsTemplate(warnResults)
    expect(issues).toContain("Warnings")
    expect(issues).not.toContain("Fails")
  })

  it("does not break commonmark rules around line breaks", () => {
    const issues = githubResultsTemplate(warnResults)
    expect(issues).not.toMatch(/(\r?\n){2}[ \t]+</)
  })

  it("Should include summary on top of message", () => {
    const issues = githubResultsTemplate(summaryResults)
    const expected =
    `
<!--
  1 failure:  Failing message F...
  1 warning:  Warning message W...
  1 messages
  1 markdown notices
-->`

    expect(issues).toContain(expected)
  })
})
