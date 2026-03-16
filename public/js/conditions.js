export async function waitUntilCondition(conditionFn, timeout = 5000, interval = 100) {
  const startTime = Date.now();
  while (!conditionFn()) {
    if (Date.now() - startTime > timeout) {
      throw new Error("Timeout waiting for condition");
    }
    await delay(interval); // Use the delay function from above
  }
  return true;
}

// Example usage: Wait for a DOM element with the ID 'target'
export async function waitForElement(id) {//#target
  try {
    await waitUntilCondition(() => document.querySelector(id));
    console.log('Element found!');
  } catch (error) {
    console.error(error.message);
  }
}
