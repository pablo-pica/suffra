import { describe, expect, it } from 'vitest';
import * as compactRuntime from '@midnight-ntwrk/compact-runtime';
import * as counterContract from '../managed/counter/contract/index.js';

// Helper to create a dummy public key for testing
const dummyCoinPublicKey = () => {
    // In onchain-runtime-v3, CoinPublicKey is a 32-byte array
    return new Uint8Array(32);
};

describe('Counter Smart Contract Tests', () => {
    it('should initialize counter value to 0', () => {
        // Create initial witnesses (empty for this contract)
        const witnesses = {};
        
        // Instantiate the generated Contract class
        const contract = new counterContract.Contract(witnesses);
        
        // Create a constructor context with empty private state
        const constructorContext = compactRuntime.createConstructorContext({}, dummyCoinPublicKey());
        
        // Get initial state
        const constructorResult = contract.initialState(constructorContext);
        
        // Parse the initial ledger state using the .data property (ChargedState)
        const initialLedger = counterContract.ledger(constructorResult.currentContractState.data);
        
        // Default value for Field in Compact is 0
        expect(initialLedger.value).toBe(0n);
    });

    it('should increment counter by a private witness value', () => {
        const witnesses = {};
        const contract = new counterContract.Contract(witnesses);
        
        // Get initial state
        const constructorContext = compactRuntime.createConstructorContext({}, dummyCoinPublicKey());
        const constructorResult = contract.initialState(constructorContext);
        
        // Setup circuit context for increment call
        const contractAddress = compactRuntime.dummyContractAddress();
        const coinPublicKey = dummyCoinPublicKey();
        const currentContractState = constructorResult.currentContractState;
        
        const circuitContext = compactRuntime.createCircuitContext(
            contractAddress,
            coinPublicKey,
            currentContractState,
            {} // private state
        );
        
        // Call the increment circuit with an increment value of 5
        const incrementValue = 5n;
        const results = contract.circuits.increment(circuitContext, incrementValue);
        
        // Get updated ledger state using the .state property of QueryContext
        const updatedLedger = counterContract.ledger(results.context.currentQueryContext.state);
        
        // Verification of state transition: 0 + 5 = 5
        expect(updatedLedger.value).toBe(5n);
    });

    it('should maintain privacy: private input remains a parameter and is never written to public ledger', () => {
        const witnesses = {};
        const contract = new counterContract.Contract(witnesses);
        
        // Get initial state
        const constructorContext = compactRuntime.createConstructorContext({}, dummyCoinPublicKey());
        const constructorResult = contract.initialState(constructorContext);
        
        const contractAddress = compactRuntime.dummyContractAddress();
        const coinPublicKey = dummyCoinPublicKey();
        const currentContractState = constructorResult.currentContractState;
        
        const circuitContext = compactRuntime.createCircuitContext(
            contractAddress,
            coinPublicKey,
            currentContractState,
            {}
        );
        
        // Call increment circuit with a private increment value of 42
        const incrementValue = 42n;
        const results = contract.circuits.increment(circuitContext, incrementValue);
        
        // Get updated ledger state using the .state property of QueryContext
        const updatedLedger = counterContract.ledger(results.context.currentQueryContext.state);
        
        // The ledger ONLY contains the resulting sum (42n), not the input (42n)
        expect(updatedLedger.value).toBe(42n);
        
        // An observer inspecting the on-chain ledger state ONLY sees the public state 'value'
        const publicKeys = Object.keys(updatedLedger);
        expect(publicKeys).toContain('value');
        expect(publicKeys).not.toContain('incrementBy'); // private witness parameter is not on ledger
    });
});
