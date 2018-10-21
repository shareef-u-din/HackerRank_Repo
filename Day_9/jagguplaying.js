import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;

public class Solution {
    
    static class fenwik_tree {
        int n;
        long[] fadd;
        
        fenwik_tree(int n) {
            this.n=n; fadd=new long[n];
        }
        
        void update(int i, long add) {
            while (i<n) {
                fadd[i]+=add;
                i|=(i+1);
            }
        }

        long query(int i) {
            long ret=0;
            while (i>=0) {
                ret+=fadd[i];
                i=(i&(i+1))-1;
            }
            return ret;
        }
        
        long query(int l, int r) {
            return query(r)-query(l-1);
        }
    }


    static int N=1000000;
    static int[] P=new int[] {1000064, 1000448, 1015808, 1048576};
    static HashMap<Integer, ArrayList<Integer>> m=new HashMap<>();
    
    static {
        for (int i=0; i<P.length; i++) {
            int pos=P[i]-N;
            ArrayList<Integer> l=new ArrayList<>();
            while(pos<N) {
                l.add(pos);
                pos+=Integer.lowestOneBit(pos);
            }
            m.put(P[i], l);
        }
    }
    
    static void update(fenwik_tree t, int pos, int M, int plus) {
        for (int i=1; i<=50; i++) {
            int back=pos;
            while(pos<=N) {
                t.update(pos, M);
                pos+=Integer.lowestOneBit(pos);
            }
            if(pos==1048576) {
                for(int j: m.get(pos)) {
                    t.update(j, 999*M);
                }
            } else {
                for(int j: m.get(pos)) {
                    t.update(j, M);
                }
                
                for(int j: m.get(1048576)) {
                    t.update(j, 998*M);
                }
            }
            pos=pos-N;
            pos=back+plus;
            if (pos>N) {
                pos-=N;
            }
        }
    }

    static void solve(int[][] q) {
        fenwik_tree t=new fenwik_tree(N+1);
        for (int i=0; i<q.length; i++) {
            if(q[i][0]==0) {
                long ret=t.query(q[i][1], q[i][2]);
                System.out.println(ret);
            } else {
                update(t, q[i][1], q[i][2], q[i][3]);
            }
        }
    }
    
    
    
    
    static void run_stream(InputStream ins) throws IOException {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        int cnt=Integer.parseInt(br.readLine());
        int[][] q=new int[cnt][4];
        for (int i=0; i<cnt; i++) {
            String[] s=br.readLine().split(" ");
            if(s[0].equals("R")) {
                q[i][1]=Integer.parseInt(s[1]);
                q[i][2]=Integer.parseInt(s[2]);
            } else {
                q[i][0]=1;
                q[i][1]=Integer.parseInt(s[1]);
                q[i][2]=Integer.parseInt(s[2]);
                q[i][3]=Integer.parseInt(s[3]);
            }
        }
        solve(q);
    }

    public static void main(String[] args) throws IOException {
        run_stream(System.in);
        
        //test_random();
    }
}