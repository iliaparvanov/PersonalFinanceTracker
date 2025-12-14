Feature: Expense Tracking
  As a user
  I want to add expenses with a name and amount
  So that I can track my spending

  Scenario: View empty expense list
    Given I am on the expense tracker page
    Then I should see an empty expenses table

  Scenario: Add a single expense
    Given I am on the expense tracker page
    When I enter "Groceries" as the expense name
    And I enter "50.00" as the expense amount
    And I click the add expense button
    Then I should see an expense "Groceries" with amount "50.00" in the table

  Scenario: Add multiple expenses
    Given I am on the expense tracker page
    When I add an expense "Groceries" with amount "50.00"
    And I add an expense "Gas" with amount "35.50"
    And I add an expense "Coffee" with amount "4.75"
    Then I should see 3 expenses in the table
    And I should see the following expenses:
      | Name      | Amount |
      | Groceries | 50.00  |
      | Gas       | 35.50  |
      | Coffee    | 4.75   |

  Scenario: Cannot submit expense without name
    Given I am on the expense tracker page
    When I enter "50.00" as the expense amount
    And I click the add expense button
    Then I should see an empty expenses table

  Scenario: Cannot submit expense without amount
    Given I am on the expense tracker page
    When I enter "Groceries" as the expense name
    And I click the add expense button
    Then I should see an empty expenses table

  Scenario: Cannot submit empty expense
    Given I am on the expense tracker page
    When I click the add expense button
    Then I should see an empty expenses table

  Scenario: Remove the only expense
    Given I am on the expense tracker page
    And I have added an expense "Groceries" with amount "50.00"
    When I remove the expense "Groceries"
    Then I should see an empty expenses table

  Scenario: Remove one expense from multiple expenses
    Given I am on the expense tracker page
    And I have added an expense "Groceries" with amount "50.00"
    And I have added an expense "Gas" with amount "35.50"
    And I have added an expense "Coffee" with amount "4.75"
    When I remove the expense "Gas"
    Then I should see 2 expenses in the table
    And I should see the following expenses:
      | Name      | Amount |
      | Groceries | 50.00  |
      | Coffee    | 4.75   |

  Scenario: Remove all expenses one by one
    Given I am on the expense tracker page
    And I have added an expense "Groceries" with amount "50.00"
    And I have added an expense "Gas" with amount "35.50"
    When I remove the expense "Groceries"
    And I remove the expense "Gas"
    Then I should see an empty expenses table

  Scenario: Each expense has a remove button
    Given I am on the expense tracker page
    And I have added an expense "Groceries" with amount "50.00"
    Then I should see a remove button for expense "Groceries"
