import java.io.*;
import java.util.*;

public class Solution {

    private static final int A = 100001;
    private static final int MOD = 1000000007;
    
    private static long modPow(long base, int exp) {
        long result = 1;
        base = base % MOD;
        while(exp > 0) {
            if((exp & 1) == 1) result = (result * base) % MOD;
            base = (base * base) % MOD;
            exp >>= 1;
        }
        return result;
    }
    
    private static class PalindromicNode {
        static final PalindromicNode EVEN_ROOT = new PalindromicNode(null, ' ', 0, 0);
        static final PalindromicNode ODD_ROOT = new PalindromicNode(null, ' ', 0, 0);
        private static final int A2 = (int) modPow(A, 2);
        static {
            ODD_ROOT.length = -1;
            EVEN_ROOT.powA = modPow(A, MOD - 2);
            ODD_ROOT.powA = modPow(EVEN_ROOT.powA, 2);
        }
        
        long frequency;
        int length;
        PalindromicNode suffix;
        Map<Character, PalindromicNode> children;
        int hash;
        long powA;
        int start, end;
        List<PalindromicNode> extensions;
        
        public PalindromicNode(PalindromicNode parent, char first, int start, int end) {
            suffix = null;
            if(parent != null) {
                powA = (parent.powA * A2) % MOD;
                length = parent.length + 2;
                int firstChar = (int) first;
                if(length > 1) {
                    hash = (int) (((1 + powA) * firstChar + ((long) A) * parent.hash) % MOD);
                } else {
                    hash = firstChar;
                }
            } else {
                powA = 0;
                length = 0;
                hash = 0;
            }
            frequency = 0;
            children = new HashMap<>();
            this.start = start;
            this.end = end;
            extensions = new LinkedList<>();
        }
        
        public PalindromicNode getChild(String s, int start, int end) {
            char newChar = s.charAt(start);
            if(end - start != length + 2) {
                System.err.println("Size mismatch! " + s.substring(start, end));
            }
            if(children.containsKey(newChar)) return children.get(newChar);
            PalindromicNode newNode = new PalindromicNode(this, newChar, start, end);
            children.put(newChar, newNode);
            PalindromicNode curSuffix = this.suffix;
            while(curSuffix != null && newChar != s.charAt(start + curSuffix.length + 1)) {
                curSuffix = curSuffix.suffix;
            }
            if(curSuffix == null) {
                if(newNode.length == 1) {
                    newNode.suffix = null;
                } else if(newNode.length >= 3 && s.charAt(start + 1) == newChar) {
                    newNode.suffix = EVEN_ROOT.getChild(s, start, start + 2);
                } else newNode.suffix = ODD_ROOT.getChild(s, start, start + 1);
            } else {
                newNode.suffix = curSuffix.getChild(s, start, start + curSuffix.length + 2);
            }
            if(newNode.suffix != null) newNode.suffix.extensions.add(newNode);
            return newNode;
        }
        
        public static PalindromicNode getNode(String s, int start, int end) {
            PalindromicNode curNode;
            if((end - start) % 2 == 0) curNode = EVEN_ROOT;
            else curNode = ODD_ROOT;
            for(int pos = (end - start - 1) >> 1; pos >= 0; pos--) {
                curNode = curNode.getChild(s, start + pos, end - pos);
            }
            return curNode;
        }
        
        public static Queue<PalindromicNode> getPalindromes(String s) {
            Queue<PalindromicNode> queue = new LinkedList<>();
            Deque<PalindromicNode> stack = new LinkedList<>();
            queue.add(ODD_ROOT);
            queue.add(EVEN_ROOT);
            while(!queue.isEmpty()) {
                PalindromicNode curNode = queue.poll();
                for(PalindromicNode child : curNode.children.values()) {
                    stack.add(child);
                    queue.add(child);
                }
            }
            
            while(!stack.isEmpty()) {
                PalindromicNode curNode = stack.pollLast();
                if(curNode.suffix != null) curNode.suffix.frequency += curNode.frequency;
            }
            EVEN_ROOT.extensions.clear();
            EVEN_ROOT.extensions.addAll(ODD_ROOT.children.values());
            Queue<PalindromicNode> result = new LinkedList<>();
            Deque<PalindromicNode> alphStack = new LinkedList<>();
            Queue<Pair> alphQueue = new PriorityQueue<>(
                    (a, b) -> - compareSubstrings(s, a.start, b.start, a.value.end, b.value.end));
            alphStack.add(EVEN_ROOT);
            while(!alphStack.isEmpty()) {
                PalindromicNode curNode = alphStack.pollLast();
                if(curNode.length > 0) result.add(curNode);
                for(PalindromicNode extension : curNode.extensions) {
                    alphQueue.add(new Pair(extension.start + curNode.length, extension));
                }
                while(!alphQueue.isEmpty()) alphStack.add(alphQueue.poll().value);
            }
            return result;
        }

        private static int compareSubstrings(String s, int start1, int start2, int end1, int end2) {
            int pos = 0;
            while(pos < end1 - start1 && pos < end2 - start2 && s.charAt(start1 + pos) == s.charAt(start2 + pos))
                pos++;
            if(pos == end1 - start1) return -1;
            if(pos == end2 - start2) return 1;
            return s.charAt(start1 + pos) - s.charAt(start2 + pos);
        }
        
        private static class Pair {
            final int start;
            final PalindromicNode value;
            
            public Pair(int start, PalindromicNode v) {
                this.start = start;
                value = v;
            }
        }
    }
    
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        int q = in.nextInt();
        String s = in.next();
        char[] sArray = s.toCharArray();
        PalindromicNode suffix = null;
        for(int i = 0; i < n; i++) {
            while(suffix != null && (suffix.length == i || sArray[i] != sArray[i - suffix.length - 1])) {
                suffix = suffix.suffix;
            }
            if(suffix == null) {
                if(i >= 1 && sArray[i-1] == sArray[i]) suffix = PalindromicNode.getNode(s, i-1, i+1); 
                else suffix = PalindromicNode.getNode(s, i, i+1);
            } else suffix = suffix.getChild(s, i - suffix.length - 1, i + 1);
            suffix.frequency++;
        }
        System.err.println("Palindromic tree generated");
        Queue<PalindromicNode> palQueue = PalindromicNode.getPalindromes(s);
        int numPalindromesDistinct = palQueue.size();
        long[] palindromesIndex = new long[numPalindromesDistinct + 1];
        int[] values = new int[numPalindromesDistinct];
        palindromesIndex[0] = 0;
        for(int i = 0; i < numPalindromesDistinct; i++) {
            PalindromicNode curNode = palQueue.poll();
            palindromesIndex[i + 1] = palindromesIndex[i] + curNode.frequency;
            values[i] = curNode.hash;
        }
        System.err.println("Lookup array created");
        int[] outputs = new int[q];
        for(int a0 = 0; a0 < q; a0++) {
            long k = in.nextLong();
            if(k > palindromesIndex[numPalindromesDistinct]) {
                outputs[a0] = -1;
            } else {
                int left = 0;
                int right = numPalindromesDistinct;
                while(left + 1 < right) {
                    int middle = (left + right) >> 1;
                    if(palindromesIndex[middle] <= k - 1) left = middle;
                    else right = middle;
                }
                outputs[a0] = values[left];
            }
        }
        in.close();
        System.err.println("Output values computed");
        for(int a0 = 0; a0 < q; a0++) System.out.println(outputs[a0]);
    }
}