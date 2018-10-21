import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {
    static long total;
    public static void main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */
        Scanner sc = new Scanner(System.in);
        int q = sc.nextInt();
        HashSet<Integer> primes = new HashSet<>();
        for(int num=2; num<=8192; num++){
            boolean isPrime= true;
            for(Integer prime : primes){
                if(num % prime == 0){
                    isPrime = false;
                    break;
                }
            }
            if(isPrime){
                primes.add(num);
            }
        }
       
        while(q > 0){
            int n = sc.nextInt();
            total = 0;
            HashMap<Integer, Integer> map = new HashMap<>();
            for(int i=0; i<n; i++){
                int num = sc.nextInt();
                if(map.containsKey(num)){
                    int cnt = map.get(num);
                    map.put(num, cnt+1);
                }
                else{
                    map.put(num, 1);
                }
            }
            Integer[] keys = map.keySet().toArray(new Integer[map.size()]);
            long MOD = 1000000007;
            long[][] dp = new long[keys.length+1][8192];
            dp[0][0] = 1;
            for(int i=1; i<=keys.length; i++){
                int freq = map.get(keys[i-1]);
                for(int j=0; j<8192; j++){
                    dp[i][j] = dp[i-1][j] + freq/2*dp[i-1][j]%MOD + (freq+1)/2*dp[i-1][j^keys[i-1]]%MOD;
                    dp[i][j] %= MOD;
                }
            }
            long res = 0;
            for(Integer prime : primes){
                res = (res + dp[keys.length][prime])%MOD;
            }
            System.out.println(res);
            q--;
        }
    }
    
}