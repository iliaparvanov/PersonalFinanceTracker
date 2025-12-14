Feature: Income Tracking
  As a user
  I want to add income items with a name and amount
  So that I can track my earnings

  Scenario: View empty income list
    Given I am on the expense tracker page
    Then I should see an empty income table

  Scenario: Add a single income item
    Given I am on the expense tracker page
    When I enter "Salary" as the income name
    And I enter "3000.00" as the income amount
    And I click the add income button
    Then I should see an income "Salary" with amount "3000.00" in the table

  Scenario: Add multiple income items
    Given I am on the expense tracker page
    When I add an income "Salary" with amount "3000.00"
    And I add an income "Freelance" with amount "500.00"
    And I add an income "Dividends" with amount "150.00"
    Then I should see 3 income items in the table
    And I should see the following income items:
      | Name      | Amount  |
      | Salary    | 3000.00 |
      | Freelance | 500.00  |
      | Dividends | 150.00  |

  Scenario: Cannot submit income without name
    Given I am on the expense tracker page
    When I enter "3000.00" as the income amount
    And I click the add income button
    Then I should see an empty income table

  Scenario: Cannot submit income without amount
    Given I am on the expense tracker page
    When I enter "Salary" as the income name
    And I click the add income button
    Then I should see an empty income table

  Scenario: Cannot submit empty income
    Given I am on the expense tracker page
    When I click the add income button
    Then I should see an empty income table

  Scenario: Remove the only income item
    Given I am on the expense tracker page
    And I have added an income "Salary" with amount "3000.00"
    When I remove the income "Salary"
    Then I should see an empty income table

  Scenario: Remove one income from multiple income items
    Given I am on the expense tracker page
    And I have added an income "Salary" with amount "3000.00"
    And I have added an income "Freelance" with amount "500.00"
    And I have added an income "Dividends" with amount "150.00"
    When I remove the income "Freelance"
    Then I should see 2 income items in the table
    And I should see the following income items:
      | Name      | Amount  |
      | Salary    | 3000.00 |
      | Dividends | 150.00  |

  Scenario: Each income item has a remove button
    Given I am on the expense tracker page
    And I have added an income "Salary" with amount "3000.00"
    Then I should see a remove button for income "Salary"

Feature: Balance Display
  As a user
  I want to see my total income, total expenses, and net balance
  So that I can understand my financial situation

  Scenario: Show total income when income items exist
    Given I am on the expense tracker page
    And I have added an income "Salary" with amount "3000.00"
    And I have added an income "Freelance" with amount "500.00"
    Then I should see total income of "3500.00"

  Scenario: Show total expenses when expense items exist
    Given I am on the expense tracker page
    And I have added an expense "Rent" with amount "1200.00"
    And I have added an expense "Groceries" with amount "300.00"
    Then I should see total expenses of "1500.00"

  Scenario: Show net balance when both income and expenses exist
    Given I am on the expense tracker page
    And I have added an income "Salary" with amount "3000.00"
    And I have added an expense "Rent" with amount "1200.00"
    Then I should see total income of "3000.00"
    And I should see total expenses of "1200.00"
    And I should see a net balance of "1800.00"

  Scenario: Net balance shows positive when income exceeds expenses
    Given I am on the expense tracker page
    And I have added an income "Salary" with amount "3000.00"
    And I have added an expense "Rent" with amount "1000.00"
    Then I should see a positive net balance of "2000.00"

  Scenario: Net balance shows negative when expenses exceed income
    Given I am on the expense tracker page
    And I have added an income "Salary" with amount "1000.00"
    And I have added an expense "Rent" with amount "1500.00"
    Then I should see a negative net balance of "-500.00"
